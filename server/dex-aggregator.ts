/**
 * DEX Aggregator Service
 * Integrates with 1inch API for best price routing across 300+ DEX sources
 * Supports all major chains with automatic liquidity aggregation
 */

import { ethers } from 'ethers';

interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  rate: number;
  priceImpact: number;
  fee: string;
  minReceived: string;
  route: string[];
  gas: string;
  protocols: string[];
}

interface SwapTransaction {
  from: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  gasPrice: string;
}

export class DexAggregator {
  private readonly ONEINCH_API = 'https://api.1inch.dev/swap/v6.0';
  private readonly apiKey: string;
  
  // Chain ID mapping for 1inch
  private readonly supportedChains: Record<number, string> = {
    1: '1',        // Ethereum
    56: '56',      // BSC
    137: '137',    // Polygon
    42161: '42161', // Arbitrum
    10: '10',      // Optimism
    8453: '8453',  // Base
    43114: '43114', // Avalanche
    250: '250',    // Fantom
  };

  constructor() {
    this.apiKey = process.env.ONEINCH_API_KEY || '';
  }

  /**
   * Get swap quote from 1inch aggregator
   */
  async getQuote(params: {
    chainId: number;
    fromToken: string;
    toToken: string;
    amount: string;
    slippage?: number;
  }): Promise<SwapQuote> {
    const { chainId, fromToken, toToken, amount, slippage = 0.5 } = params;

    if (!this.supportedChains[chainId]) {
      throw new Error(`Chain ${chainId} not supported by DEX aggregator`);
    }

    try {
      // Use 1inch quote API
      const url = `${this.ONEINCH_API}/${chainId}/quote?src=${fromToken}&dst=${toToken}&amount=${amount}`;
      
      const response = await fetch(url, {
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
      });

      if (!response.ok) {
        // Fallback to simple calculation if API fails
        console.warn('1inch API unavailable, using fallback calculation');
        return this.getFallbackQuote(params);
      }

      const data = await response.json();
      
      // Calculate platform fee (0.3%)
      const platformFee = (BigInt(data.dstAmount) * BigInt(3)) / BigInt(1000);
      const toAmountAfterFee = BigInt(data.dstAmount) - platformFee;
      
      return {
        fromToken,
        toToken,
        fromAmount: amount,
        toAmount: toAmountAfterFee.toString(),
        rate: parseFloat(data.dstAmount) / parseFloat(amount),
        priceImpact: parseFloat(data.estimatedGas) / parseFloat(amount) * 100,
        fee: platformFee.toString(),
        minReceived: (toAmountAfterFee * BigInt(100 - slippage * 100) / BigInt(100)).toString(),
        route: data.protocols?.[0]?.map((p: any) => p.name) || [],
        gas: data.gas || '150000',
        protocols: data.protocols?.[0]?.map((p: any) => p.name) || ['Uniswap V3'],
      };
    } catch (error) {
      console.error('DEX quote error:', error);
      return this.getFallbackQuote(params);
    }
  }

  /**
   * Get swap transaction data for execution
   */
  async getSwapTransaction(params: {
    chainId: number;
    fromToken: string;
    toToken: string;
    amount: string;
    from: string;
    slippage?: number;
  }): Promise<SwapTransaction> {
    const { chainId, fromToken, toToken, amount, from, slippage = 0.5 } = params;

    if (!this.supportedChains[chainId]) {
      throw new Error(`Chain ${chainId} not supported by DEX aggregator`);
    }

    // Require API key for actual swaps
    if (!this.apiKey) {
      throw new Error('1inch API key required for swaps. Add ONEINCH_API_KEY to Replit Secrets to enable DEX trading.');
    }

    // Platform fee wallet address (where 0.3% fee goes)
    const FEE_WALLET = process.env.PLATFORM_FEE_WALLET || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0';
    const PLATFORM_FEE_BPS = 30; // 0.3% in basis points (30/10000 = 0.003)

    try {
      // Build swap URL with fee parameters for platform revenue
      const url = `${this.ONEINCH_API}/${chainId}/swap?` + 
        `src=${fromToken}&` +
        `dst=${toToken}&` +
        `amount=${amount}&` +
        `from=${from}&` +
        `slippage=${slippage}&` +
        `fee=${PLATFORM_FEE_BPS}&` +
        `referrer=${FEE_WALLET}`;
      
      const response = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('1inch API error:', errorText);
        throw new Error(`1inch API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      return {
        from: data.tx.from,
        to: data.tx.to,
        data: data.tx.data,
        value: data.tx.value,
        gas: data.tx.gas,
        gasPrice: data.tx.gasPrice,
      };
    } catch (error) {
      console.error('DEX swap transaction error:', error);
      throw error; // Throw original error for better debugging
    }
  }

  /**
   * Fallback quote calculation when 1inch API is unavailable
   * Uses CoinGecko prices for estimation
   */
  private async getFallbackQuote(params: {
    fromToken: string;
    toToken: string;
    amount: string;
    slippage?: number;
  }): Promise<SwapQuote> {
    const { fromToken, toToken, amount, slippage = 0.5 } = params;
    
    // Import price service
    const { getCryptoPrice } = await import('./price-service');
    
    // Map token addresses to CoinGecko IDs (simplified)
    const tokenToCoinGecko: Record<string, string> = {
      'ETH': 'ethereum',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': 'ethereum', // Native ETH
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'usd-coin', // USDC
      '0xdac17f958d2ee523a2206206994597c13d831ec7': 'tether', // USDT
      '0x6b175474e89094c44da98b954eedeac495271d0f': 'dai', // DAI
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': 'wrapped-bitcoin', // WBTC
    };
    
    const fromCoinId = tokenToCoinGecko[fromToken] || 'ethereum';
    const toCoinId = tokenToCoinGecko[toToken] || 'usd-coin';
    
    const fromPrice = getCryptoPrice(fromCoinId);
    const toPrice = getCryptoPrice(toCoinId);
    
    if (!fromPrice || !toPrice) {
      throw new Error('Unable to fetch token prices');
    }
    
    // Calculate output amount
    const fromValue = parseFloat(amount) * fromPrice.usd;
    const toAmount = fromValue / toPrice.usd;
    
    // Apply 0.3% platform fee
    const platformFee = toAmount * 0.003;
    const toAmountAfterFee = toAmount - platformFee;
    
    // Convert to wei (18 decimals)
    const toAmountWei = BigInt(Math.floor(toAmountAfterFee * 1e18));
    const platformFeeWei = BigInt(Math.floor(platformFee * 1e18));
    
    return {
      fromToken,
      toToken,
      fromAmount: amount,
      toAmount: toAmountWei.toString(),
      rate: toAmount / parseFloat(amount),
      priceImpact: 0.1, // Minimal impact for fallback
      fee: platformFeeWei.toString(),
      minReceived: (toAmountWei * BigInt(100 - slippage * 100) / BigInt(100)).toString(),
      route: ['Direct'],
      gas: '150000',
      protocols: ['Fallback Pricing'],
    };
  }

  /**
   * Get list of supported tokens for a chain
   */
  async getSupportedTokens(chainId: number): Promise<any[]> {
    if (!this.supportedChains[chainId]) {
      return [];
    }

    try {
      const url = `${this.ONEINCH_API}/${chainId}/tokens`;
      const response = await fetch(url, {
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
      });

      if (!response.ok) {
        return this.getDefaultTokens(chainId);
      }

      const data = await response.json();
      return Object.values(data.tokens || {});
    } catch (error) {
      return this.getDefaultTokens(chainId);
    }
  }

  /**
   * Default token list when API is unavailable
   */
  private getDefaultTokens(chainId: number): any[] {
    const defaultTokens: Record<number, any[]> = {
      1: [ // Ethereum
        { symbol: 'ETH', name: 'Ethereum', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18 },
        { symbol: 'USDC', name: 'USD Coin', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        { symbol: 'USDT', name: 'Tether', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        { symbol: 'DAI', name: 'Dai', address: '0x6b175474e89094c44da98b954eedeac495271d0f', decimals: 18 },
        { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', decimals: 8 },
      ],
      56: [ // BSC
        { symbol: 'BNB', name: 'BNB', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18 },
        { symbol: 'BUSD', name: 'Binance USD', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56', decimals: 18 },
        { symbol: 'USDT', name: 'Tether', address: '0x55d398326f99059ff775485246999027b3197955', decimals: 18 },
      ],
      137: [ // Polygon
        { symbol: 'MATIC', name: 'Polygon', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18 },
        { symbol: 'USDC', name: 'USD Coin', address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', decimals: 6 },
        { symbol: 'USDT', name: 'Tether', address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', decimals: 6 },
      ],
    };

    return defaultTokens[chainId] || [];
  }
}

export const dexAggregator = new DexAggregator();
