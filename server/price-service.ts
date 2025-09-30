import { ethers } from "ethers";

// Cryptocurrency price service
// In production, replace with real API (CoinGecko, CoinMarketCap, Chainlink oracle, etc.)

export interface CryptoPrice {
  usd: number;
  lastUpdated: Date;
}

const PRICES: Record<string, CryptoPrice> = {
  ETH: { usd: 2500, lastUpdated: new Date() },
  USDC: { usd: 1.0, lastUpdated: new Date() },
  DAI: { usd: 1.0, lastUpdated: new Date() },
  USDT: { usd: 1.0, lastUpdated: new Date() },
};

export function getCryptoPrice(symbol: string): CryptoPrice | null {
  return PRICES[symbol.toUpperCase()] || null;
}

export function convertUsdToCrypto(usdAmount: number, cryptoSymbol: string): string {
  const price = getCryptoPrice(cryptoSymbol);
  if (!price) {
    throw new Error(`Price not available for ${cryptoSymbol}`);
  }
  
  const cryptoAmount = usdAmount / price.usd;
  return cryptoAmount.toFixed(8);
}

export function convertCryptoToUsd(cryptoAmount: string, cryptoSymbol: string): number {
  const price = getCryptoPrice(cryptoSymbol);
  if (!price) {
    throw new Error(`Price not available for ${cryptoSymbol}`);
  }
  
  const amount = parseFloat(cryptoAmount);
  return amount * price.usd;
}

export function getAllPrices(): Record<string, CryptoPrice> {
  return { ...PRICES };
}

// Format crypto amount for display
export function formatCryptoAmount(amount: string, symbol: string): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return "0";
  
  // Stablecoins show 2 decimals, others show 6
  const decimals = ["USDC", "USDT", "DAI"].includes(symbol.toUpperCase()) ? 2 : 6;
  return num.toFixed(decimals);
}

// Calculate slippage tolerance for crypto payments
export function calculateSlippageBounds(
  cryptoAmount: string,
  toleranceBps: number // basis points (100 = 1%)
): { min: string; max: string } {
  const amount = ethers.parseUnits(cryptoAmount, 18);
  const tolerance = (amount * BigInt(toleranceBps)) / BigInt(10000);
  
  const min = amount - tolerance;
  const max = amount + tolerance;
  
  return {
    min: ethers.formatUnits(min, 18),
    max: ethers.formatUnits(max, 18),
  };
}

// TODO: Implement real-time price fetching from oracle/API
// export async function fetchLivePrices(): Promise<void> {
//   // Fetch from CoinGecko, CoinMarketCap, or Chainlink oracle
//   // Update PRICES cache
// }
