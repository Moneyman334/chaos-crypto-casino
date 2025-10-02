import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Globe,
  Coins,
  BarChart3,
  Zap,
  Shield,
  Clock,
  ArrowUpDown,
  Target
} from "lucide-react";

const syntheticAssets = {
  stocks: [
    { symbol: "sTSLA", name: "Tesla Inc.", price: "$245.32", change: "+3.24%", volume: "$45.2M", marketCap: "$780B", trend: "up" },
    { symbol: "sAAPL", name: "Apple Inc.", price: "$178.45", change: "-1.12%", volume: "$89.5M", marketCap: "$2.8T", trend: "down" },
    { symbol: "sGOOG", name: "Google", price: "$142.18", change: "+2.87%", volume: "$52.3M", marketCap: "$1.8T", trend: "up" },
    { symbol: "sAMZN", name: "Amazon", price: "$156.89", change: "+1.45%", volume: "$67.1M", marketCap: "$1.6T", trend: "up" },
    { symbol: "sMSFT", name: "Microsoft", price: "$398.12", change: "-0.89%", volume: "$78.9M", marketCap: "$2.9T", trend: "down" },
    { symbol: "sNVDA", name: "NVIDIA", price: "$495.67", change: "+5.32%", volume: "$102.4M", marketCap: "$1.2T", trend: "up" }
  ],
  commodities: [
    { symbol: "sGOLD", name: "Gold", price: "$2,045.00", change: "+0.45%", volume: "$12.5M", unit: "oz", trend: "up" },
    { symbol: "sOIL", name: "Crude Oil", price: "$78.34", change: "-2.12%", volume: "$8.9M", unit: "barrel", trend: "down" },
    { symbol: "sSILVER", name: "Silver", price: "$24.56", change: "+1.23%", volume: "$5.2M", unit: "oz", trend: "up" },
    { symbol: "sNGAS", name: "Natural Gas", price: "$2.89", change: "-3.45%", volume: "$4.1M", unit: "MMBtu", trend: "down" }
  ],
  forex: [
    { symbol: "sEUR/USD", name: "Euro/Dollar", price: "1.0845", change: "+0.12%", volume: "$156.8M", trend: "up" },
    { symbol: "sGBP/USD", name: "Pound/Dollar", price: "1.2634", change: "-0.34%", volume: "$89.3M", trend: "down" },
    { symbol: "sJPY/USD", name: "Yen/Dollar", price: "149.85", change: "+0.89%", volume: "$134.2M", trend: "up" },
    { symbol: "sAUD/USD", name: "Aussie/Dollar", price: "0.6523", change: "-0.56%", volume: "$42.7M", trend: "down" }
  ]
};

const positions = [
  { asset: "sTSLA", type: "Long", entry: "$232.50", current: "$245.32", size: "100", pnl: "+$1,282", pnlPercent: "+5.51%" },
  { asset: "sGOLD", type: "Long", entry: "$2,012.00", current: "$2,045.00", size: "10", pnl: "+$330", pnlPercent: "+1.64%" },
  { asset: "sAAPL", type: "Short", entry: "$185.00", current: "$178.45", size: "50", pnl: "+$327.50", pnlPercent: "+3.54%" }
];

export default function SyntheticAssets() {
  const { account } = useWeb3();
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<any>(syntheticAssets.stocks[0]);
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeType, setTradeType] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState("1");

  const executeTrade = useMutation({
    mutationFn: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "✅ Trade Executed!",
        description: `${tradeType === "long" ? "Bought" : "Shorted"} ${selectedAsset.symbol} with ${leverage}x leverage`,
      });
      setTradeAmount("");
    }
  });

  const closePosition = useMutation({
    mutationFn: async (asset: string) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return asset;
    },
    onSuccess: () => {
      toast({
        title: "🎯 Position Closed!",
        description: "Your position has been closed and profits realized",
      });
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-float">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 glow-primary animate-pulse-slow">
              <BarChart3 className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,51,234,0.4)]" data-testid="title-synthetic-assets">
                Synthetic Assets
              </h1>
              <p className="text-muted-foreground mt-1">Trade Tokenized Stocks • Commodities • Forex On-Chain</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <DollarSign className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Volume 24h</p>
                    <p className="text-2xl font-bold" data-testid="text-volume">$1.2B</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Assets</p>
                    <p className="text-2xl font-bold" data-testid="text-assets">50+</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Leverage</p>
                    <p className="text-2xl font-bold" data-testid="text-leverage">20x</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Shield className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Collateral Ratio</p>
                    <p className="text-2xl font-bold" data-testid="text-collateral">150%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Markets */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="stocks">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stocks" data-testid="tab-stocks">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Stocks
                </TabsTrigger>
                <TabsTrigger value="commodities" data-testid="tab-commodities">
                  <Coins className="h-4 w-4 mr-2" />
                  Commodities
                </TabsTrigger>
                <TabsTrigger value="forex" data-testid="tab-forex">
                  <Globe className="h-4 w-4 mr-2" />
                  Forex
                </TabsTrigger>
              </TabsList>

              {/* Stocks */}
              <TabsContent value="stocks" className="space-y-3 mt-4">
                {syntheticAssets.stocks.map((stock, idx) => (
                  <Card
                    key={idx}
                    className={`cursor-pointer transition-all ${
                      selectedAsset.symbol === stock.symbol
                        ? "border-purple-500 bg-purple-500/5"
                        : "hover:border-purple-500/50"
                    }`}
                    onClick={() => setSelectedAsset(stock)}
                    data-testid={`stock-${stock.symbol.toLowerCase()}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-lg">{stock.symbol}</p>
                            <Badge variant="outline" className="text-xs">{stock.name}</Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>Vol: {stock.volume}</span>
                            <span>MCap: {stock.marketCap}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl">{stock.price}</p>
                          <p className={`text-sm font-semibold ${stock.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {stock.change}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Commodities */}
              <TabsContent value="commodities" className="space-y-3 mt-4">
                {syntheticAssets.commodities.map((commodity, idx) => (
                  <Card
                    key={idx}
                    className={`cursor-pointer transition-all ${
                      selectedAsset.symbol === commodity.symbol
                        ? "border-purple-500 bg-purple-500/5"
                        : "hover:border-purple-500/50"
                    }`}
                    onClick={() => setSelectedAsset(commodity)}
                    data-testid={`commodity-${commodity.symbol.toLowerCase()}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-lg">{commodity.symbol}</p>
                            <Badge variant="outline" className="text-xs">{commodity.name}</Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>Unit: {commodity.unit}</span>
                            <span>Vol: {commodity.volume}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl">{commodity.price}</p>
                          <p className={`text-sm font-semibold ${commodity.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {commodity.change}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Forex */}
              <TabsContent value="forex" className="space-y-3 mt-4">
                {syntheticAssets.forex.map((pair, idx) => (
                  <Card
                    key={idx}
                    className={`cursor-pointer transition-all ${
                      selectedAsset.symbol === pair.symbol
                        ? "border-purple-500 bg-purple-500/5"
                        : "hover:border-purple-500/50"
                    }`}
                    onClick={() => setSelectedAsset(pair)}
                    data-testid={`forex-${pair.symbol.toLowerCase().replace('/', '-')}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-lg">{pair.symbol}</p>
                            <Badge variant="outline" className="text-xs">{pair.name}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Vol: {pair.volume}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl">{pair.price}</p>
                          <p className={`text-sm font-semibold ${pair.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {pair.change}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            {/* Open Positions */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Open Positions
                </CardTitle>
                <CardDescription>Your active synthetic asset positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {positions.map((position, idx) => (
                    <Card key={idx} className="border-2" data-testid={`position-${position.asset.toLowerCase()}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-lg">{position.asset}</p>
                              <Badge variant={position.type === "Long" ? "default" : "destructive"}>
                                {position.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Size: {position.size} units</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold text-lg ${position.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {position.pnl}
                            </p>
                            <p className="text-sm text-muted-foreground">{position.pnlPercent}</p>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground">Entry: </span>
                            <span className="font-semibold">{position.entry}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Current: </span>
                            <span className="font-semibold">{position.current}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => closePosition.mutate(position.asset)}
                          disabled={closePosition.isPending}
                          data-testid={`button-close-${position.asset.toLowerCase()}`}
                        >
                          {closePosition.isPending ? "Closing..." : "Close Position"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Panel */}
          <div>
            <Card className="premium-card cosmic-dust sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Trade {selectedAsset.symbol}
                </CardTitle>
                <CardDescription>{selectedAsset.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <span className="font-bold text-xl">{selectedAsset.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">24h Change</span>
                    <span className={`font-semibold ${selectedAsset.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {selectedAsset.change}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Position Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={tradeType === "long" ? "default" : "outline"}
                      onClick={() => setTradeType("long")}
                      className="w-full"
                      data-testid="button-long"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Long
                    </Button>
                    <Button
                      variant={tradeType === "short" ? "destructive" : "outline"}
                      onClick={() => setTradeType("short")}
                      className="w-full"
                      data-testid="button-short"
                    >
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Short
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (USD)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    className="text-xl h-12"
                    data-testid="input-trade-amount"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Leverage</label>
                  <Select value={leverage} onValueChange={setLeverage}>
                    <SelectTrigger data-testid="select-leverage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1" data-testid="option-leverage-1">1x (No Leverage)</SelectItem>
                      <SelectItem value="2" data-testid="option-leverage-2">2x</SelectItem>
                      <SelectItem value="5" data-testid="option-leverage-5">5x</SelectItem>
                      <SelectItem value="10" data-testid="option-leverage-10">10x</SelectItem>
                      <SelectItem value="20" data-testid="option-leverage-20">20x (Maximum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {tradeAmount && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Position Size</span>
                        <span className="font-bold">
                          ${(parseFloat(tradeAmount) * parseFloat(leverage)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Required Collateral</span>
                        <span className="font-semibold">${tradeAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Liquidation Price</span>
                        <span className="text-red-500 font-semibold">
                          ${(parseFloat(selectedAsset.price.replace(/[^0-9.]/g, '')) * (tradeType === "long" ? 0.95 : 1.05)).toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  className="w-full h-12"
                  onClick={() => executeTrade.mutate({ asset: selectedAsset, amount: tradeAmount, type: tradeType, leverage })}
                  disabled={!account || !tradeAmount || executeTrade.isPending}
                  variant={tradeType === "long" ? "default" : "destructive"}
                  data-testid="button-execute-trade"
                >
                  {executeTrade.isPending ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      {tradeType === "long" ? "Buy Long" : "Sell Short"}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Oracle price updates every 30 seconds. Powered by Chainlink.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
