import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeb3 } from "@/hooks/use-web3";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowDownUp, TrendingUp, DollarSign, Zap, Info, RefreshCw, Settings } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoUrl?: string;
  price: number;
  balance: string;
}

interface SwapQuote {
  fromAmount: string;
  toAmount: string;
  rate: number;
  priceImpact: number;
  fee: string;
  minReceived: string;
  route: string[];
}

export default function SwapPage() {
  const { account, balance } = useWeb3();
  const { toast } = useToast();
  
  const [fromToken, setFromToken] = useState<string>("ETH");
  const [toToken, setToToken] = useState<string>("USDC");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [showSettings, setShowSettings] = useState(false);

  // Popular tokens
  const tokens: Token[] = [
    { symbol: "ETH", name: "Ethereum", address: "0x0", decimals: 18, price: 2000, balance: balance || "0" },
    { symbol: "USDC", name: "USD Coin", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", decimals: 6, price: 1, balance: "0" },
    { symbol: "USDT", name: "Tether", address: "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 6, price: 1, balance: "0" },
    { symbol: "DAI", name: "Dai Stablecoin", address: "0x6b175474e89094c44da98b954eedeac495271d0f", decimals: 18, price: 1, balance: "0" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", decimals: 8, price: 40000, balance: "0" },
  ];

  const { data: quote, refetch: refetchQuote } = useQuery<SwapQuote>({
    queryKey: ['/api/swap/quote', fromToken, toToken, fromAmount],
    enabled: !!fromAmount && parseFloat(fromAmount) > 0 && fromToken !== toToken,
  });

  const swapMutation = useMutation({
    mutationFn: async () => {
      if (!account) throw new Error("Connect wallet to swap");
      if (!fromAmount || parseFloat(fromAmount) === 0) throw new Error("Enter amount to swap");
      
      return apiRequest('POST', '/api/swap', {
        fromToken,
        toToken,
        fromAmount,
        wallet: account,
        slippage,
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Swap Successful!",
        description: `Swapped ${fromAmount} ${fromToken} for ${data.toAmount} ${toToken}`,
      });
      setFromAmount("");
      setToAmount("");
    },
    onError: (error: Error) => {
      toast({
        title: "Swap Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Calculate estimated output when input changes
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0 && fromToken !== toToken) {
      const fromTokenData = tokens.find(t => t.symbol === fromToken);
      const toTokenData = tokens.find(t => t.symbol === toToken);
      
      if (fromTokenData && toTokenData) {
        const fromValue = parseFloat(fromAmount) * fromTokenData.price;
        const estimatedTo = fromValue / toTokenData.price;
        const withFee = estimatedTo * 0.997; // 0.3% fee
        setToAmount(withFee.toFixed(6));
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleMaxAmount = () => {
    const token = tokens.find(t => t.symbol === fromToken);
    if (token) {
      setFromAmount(parseFloat(token.balance).toFixed(6));
    }
  };

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);
  const estimatedValue = fromAmount && fromTokenData 
    ? (parseFloat(fromAmount) * fromTokenData.price).toFixed(2)
    : "0.00";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Token Swap</h1>
          <p className="text-muted-foreground">Exchange cryptocurrencies instantly</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-2xl font-bold">$1.2M</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Swaps</p>
                  <p className="text-2xl font-bold">45.3K</p>
                </div>
                <ArrowDownUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Swap Fee</p>
                  <p className="text-2xl font-bold">0.3%</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Swap Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Swap Tokens</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                data-testid="button-settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            {showSettings && (
              <div className="mt-4 p-4 border rounded-lg space-y-3">
                <div className="space-y-2">
                  <Label>Slippage Tolerance</Label>
                  <div className="flex gap-2">
                    {[0.1, 0.5, 1.0].map(value => (
                      <Button
                        key={value}
                        variant={slippage === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSlippage(value)}
                        data-testid={`button-slippage-${value}`}
                      >
                        {value}%
                      </Button>
                    ))}
                    <Input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                      className="w-20"
                      step="0.1"
                      data-testid="input-custom-slippage"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* From Token */}
            <div className="space-y-2">
              <Label>From</Label>
              <div className="relative">
                <div className="flex gap-2">
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[180px]" data-testid="select-from-token">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map(token => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{token.symbol}</span>
                            <span className="text-sm text-muted-foreground">{token.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="pr-16"
                      data-testid="input-from-amount"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={handleMaxAmount}
                      data-testid="button-max"
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Balance: {fromTokenData ? parseFloat(fromTokenData.balance).toFixed(6) : "0"} {fromToken}</span>
                  <span>≈ ${estimatedValue}</span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-4 border-background"
                onClick={handleFlipTokens}
                data-testid="button-flip-tokens"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>

            {/* To Token */}
            <div className="space-y-2">
              <Label>To</Label>
              <div className="flex gap-2">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="w-[180px]" data-testid="select-to-token">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{token.symbol}</span>
                          <span className="text-sm text-muted-foreground">{token.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  readOnly
                  className="flex-1"
                  data-testid="input-to-amount"
                />
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Balance: {toTokenData ? parseFloat(toTokenData.balance).toFixed(6) : "0"} {toToken}</span>
                <span>≈ ${toAmount && toTokenData ? (parseFloat(toAmount) * toTokenData.price).toFixed(2) : "0.00"}</span>
              </div>
            </div>

            {/* Swap Details */}
            {fromAmount && toAmount && fromToken !== toToken && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-semibold">
                    1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee (0.3%)</span>
                  <span className="font-semibold">
                    {(parseFloat(fromAmount) * 0.003).toFixed(6)} {fromToken}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price Impact</span>
                  <span className="font-semibold text-green-600">&lt;0.01%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min Received</span>
                  <span className="font-semibold">
                    {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken}
                  </span>
                </div>
              </div>
            )}

            {/* Swap Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={() => swapMutation.mutate()}
              disabled={
                !account ||
                !fromAmount ||
                parseFloat(fromAmount) === 0 ||
                fromToken === toToken ||
                swapMutation.isPending
              }
              data-testid="button-swap"
            >
              {!account
                ? "Connect Wallet"
                : fromToken === toToken
                ? "Select Different Tokens"
                : swapMutation.isPending
                ? "Swapping..."
                : "Swap"}
            </Button>

            {/* Info Banner */}
            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Swaps are executed instantly with best available rates across multiple liquidity pools
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Popular Pairs */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Popular Trading Pairs</CardTitle>
            <CardDescription>Quick access to frequently traded pairs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {[
                { from: "ETH", to: "USDC", change: "+2.4%" },
                { from: "WBTC", to: "ETH", change: "+1.2%" },
                { from: "ETH", to: "DAI", change: "+2.3%" },
                { from: "USDC", to: "USDT", change: "+0.01%" },
              ].map((pair, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-between"
                  onClick={() => {
                    setFromToken(pair.from);
                    setToToken(pair.to);
                  }}
                  data-testid={`button-pair-${pair.from}-${pair.to}`}
                >
                  <span className="font-semibold">{pair.from}/{pair.to}</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    {pair.change}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
