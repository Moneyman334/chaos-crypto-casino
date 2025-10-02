import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Zap,
  Shield,
  DollarSign,
  ArrowUpDown,
  Percent,
  Clock,
  Target,
  Sparkles,
  LineChart,
  AlertTriangle
} from "lucide-react";

const yieldOpportunities = [
  { id: 1, protocol: "Aave", asset: "USDC", apy: "12.5", tvl: "$2.4B", risk: "Low", strategy: "Lending" },
  { id: 2, protocol: "Compound", asset: "ETH", apy: "8.2", tvl: "$1.8B", risk: "Low", strategy: "Lending" },
  { id: 3, protocol: "Curve", asset: "3pool", apy: "18.9", tvl: "$3.2B", risk: "Medium", strategy: "LP" },
  { id: 4, protocol: "Yearn", asset: "yvDAI", apy: "22.3", tvl: "$850M", risk: "Medium", strategy: "Vault" },
  { id: 5, protocol: "Convex", asset: "cvxCRV", apy: "45.7", tvl: "$1.2B", risk: "High", strategy: "Staking" },
  { id: 6, protocol: "GMX", asset: "GLP", apy: "35.2", tvl: "$540M", risk: "High", strategy: "Liquidity" },
];

const flashLoanProtocols = [
  { id: 1, name: "Aave", maxLoan: "$100M", fee: "0.09%", assets: ["ETH", "USDC", "DAI", "WBTC"] },
  { id: 2, name: "dYdX", maxLoan: "$50M", fee: "0%", assets: ["ETH", "USDC", "DAI"] },
  { id: 3, name: "Uniswap V3", maxLoan: "$200M", fee: "0.05%", assets: ["ETH", "USDC", "USDT"] },
];

const derivatives = [
  { id: 1, type: "Perpetual", pair: "ETH-USD", leverage: "100x", fundingRate: "0.01%", volume: "$24.5B" },
  { id: 2, type: "Options", pair: "ETH-USD", strike: "$2000", expiry: "30 days", iv: "65%" },
  { id: 3, type: "Futures", pair: "BTC-USD", leverage: "50x", expiry: "Quarterly", volume: "$18.2B" },
];

export default function DeFiSuitePage() {
  const { account, balance } = useWeb3();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedYield, setSelectedYield] = useState(yieldOpportunities[0]);
  const [yieldAmount, setYieldAmount] = useState("");
  const [flashLoanAmount, setFlashLoanAmount] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState(flashLoanProtocols[0]);
  const [selectedAsset, setSelectedAsset] = useState(flashLoanProtocols[0].assets[0]);
  
  const optimizeYield = useMutation({
    mutationFn: async (data: any) => {
      // Simulate optimization
      await new Promise(resolve => setTimeout(resolve, 2000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "✨ Yield Optimized!",
        description: `Allocated ${yieldAmount} to ${selectedYield.protocol} with ${selectedYield.apy}% APY`,
      });
    }
  });

  const executeFlashLoan = useMutation({
    mutationFn: async (data: any) => {
      // Simulate flash loan execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "⚡ Flash Loan Executed!",
        description: `Borrowed ${flashLoanAmount} ${selectedAsset} from ${selectedProtocol.name}`,
      });
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-float">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 glow-secondary animate-pulse-slow">
              <TrendingUp className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]" data-testid="title-defi-suite">
                Advanced DeFi Suite
              </h1>
              <p className="text-muted-foreground mt-1">Yield Optimization • Flash Loans • Derivatives Trading</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total TVL</p>
                    <p className="text-2xl font-bold" data-testid="text-tvl">$9.99B</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Percent className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg APY</p>
                    <p className="text-2xl font-bold" data-testid="text-avg-apy">23.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flash Loans/Day</p>
                    <p className="text-2xl font-bold" data-testid="text-flash-loans">12.5K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <LineChart className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Derivative Volume</p>
                    <p className="text-2xl font-bold" data-testid="text-derivative-volume">$42.7B</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="yield" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="yield" data-testid="tab-yield">
              <Sparkles className="h-4 w-4 mr-2" />
              Yield Aggregator
            </TabsTrigger>
            <TabsTrigger value="flash" data-testid="tab-flash">
              <Zap className="h-4 w-4 mr-2" />
              Flash Loans
            </TabsTrigger>
            <TabsTrigger value="derivatives" data-testid="tab-derivatives">
              <TrendingUp className="h-4 w-4 mr-2" />
              Derivatives
            </TabsTrigger>
          </TabsList>

          {/* Yield Aggregator */}
          <TabsContent value="yield" className="space-y-6">
            <Card className="premium-card cosmic-dust border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Auto-Optimize Yields
                </CardTitle>
                <CardDescription>
                  Automatically allocate funds to the highest-yielding DeFi protocols with optimal risk/reward
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {yieldOpportunities.map(opportunity => (
                    <Card 
                      key={opportunity.id}
                      className={`cursor-pointer transition-all ${
                        selectedYield.id === opportunity.id
                          ? 'border-green-500 bg-green-500/5'
                          : 'hover:border-green-500/50'
                      }`}
                      onClick={() => setSelectedYield(opportunity)}
                      data-testid={`card-yield-${opportunity.protocol.toLowerCase()}`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{opportunity.protocol}</h3>
                            <p className="text-sm text-muted-foreground">{opportunity.asset}</p>
                          </div>
                          <Badge variant={opportunity.risk === "Low" ? "outline" : opportunity.risk === "Medium" ? "secondary" : "destructive"}>
                            {opportunity.risk}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">APY</span>
                            <span className="text-green-500 font-bold">{opportunity.apy}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">TVL</span>
                            <span className="font-semibold">{opportunity.tvl}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Strategy</span>
                            <span className="text-muted-foreground">{opportunity.strategy}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount to Invest</label>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={yieldAmount}
                      onChange={(e) => setYieldAmount(e.target.value)}
                      className="text-xl h-12"
                      data-testid="input-yield-amount"
                    />
                  </div>

                  {yieldAmount && (
                    <Card className="bg-muted/50">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Estimated Annual Return</span>
                          <span className="text-green-500 font-bold">
                            ${(parseFloat(yieldAmount) * parseFloat(selectedYield.apy) / 100).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Daily Yield</span>
                          <span className="font-semibold">
                            ${(parseFloat(yieldAmount) * parseFloat(selectedYield.apy) / 100 / 365).toFixed(4)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button
                    className="w-full h-12"
                    onClick={() => optimizeYield.mutate({ amount: yieldAmount, protocol: selectedYield })}
                    disabled={!account || !yieldAmount || optimizeYield.isPending}
                    data-testid="button-optimize-yield"
                  >
                    {optimizeYield.isPending ? (
                      <>
                        <Zap className="h-5 w-5 mr-2 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Optimize Yield
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flash Loans */}
          <TabsContent value="flash" className="space-y-6">
            <Card className="premium-card cosmic-dust border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Flash Loan Execution
                </CardTitle>
                <CardDescription>
                  Borrow millions instantly with no collateral - perfect for arbitrage, liquidations, and more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {flashLoanProtocols.map(protocol => (
                    <Card 
                      key={protocol.id}
                      className={`cursor-pointer transition-all ${
                        selectedProtocol.id === protocol.id
                          ? 'border-purple-500 bg-purple-500/5'
                          : 'hover:border-purple-500/50'
                      }`}
                      onClick={() => setSelectedProtocol(protocol)}
                      data-testid={`card-protocol-${protocol.name.toLowerCase()}`}
                    >
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-4">{protocol.name}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Max Loan</span>
                            <span className="font-bold">{protocol.maxLoan}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Fee</span>
                            <span className="text-purple-500">{protocol.fee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Assets</span>
                            <span className="text-muted-foreground">{protocol.assets.length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Asset</label>
                    <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                      <SelectTrigger data-testid="select-flash-asset">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProtocol.assets.map(asset => (
                          <SelectItem key={asset} value={asset} data-testid={`option-asset-${asset.toLowerCase()}`}>
                            {asset}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Loan Amount</label>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={flashLoanAmount}
                      onChange={(e) => setFlashLoanAmount(e.target.value)}
                      className="text-xl h-12"
                      data-testid="input-flash-amount"
                    />
                  </div>

                  {flashLoanAmount && (
                    <Card className="bg-yellow-500/10 border-yellow-500/30">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Loan Fee</span>
                              <span className="font-bold">
                                {(parseFloat(flashLoanAmount) * parseFloat(selectedProtocol.fee.replace('%', '')) / 100).toFixed(4)} {selectedAsset}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Must Repay</span>
                              <span className="text-red-500 font-bold">
                                {(parseFloat(flashLoanAmount) * (1 + parseFloat(selectedProtocol.fee.replace('%', '')) / 100)).toFixed(4)} {selectedAsset}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Flash loans must be repaid within the same transaction or they will revert
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button
                    className="w-full h-12"
                    variant="destructive"
                    onClick={() => executeFlashLoan.mutate({ amount: flashLoanAmount, asset: selectedAsset, protocol: selectedProtocol })}
                    disabled={!account || !flashLoanAmount || executeFlashLoan.isPending}
                    data-testid="button-execute-flash-loan"
                  >
                    {executeFlashLoan.isPending ? (
                      <>
                        <Zap className="h-5 w-5 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Execute Flash Loan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Derivatives */}
          <TabsContent value="derivatives" className="space-y-6">
            <Card className="premium-card cosmic-dust border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Derivatives Trading
                </CardTitle>
                <CardDescription>
                  Trade perpetuals, futures, and options with up to 100x leverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {derivatives.map(derivative => (
                    <Card key={derivative.id} className="border-orange-500/20" data-testid={`card-derivative-${derivative.type.toLowerCase()}`}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{derivative.pair}</h3>
                              <Badge>{derivative.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {derivative.type === "Perpetual" && `Funding Rate: ${derivative.fundingRate}`}
                              {derivative.type === "Options" && `Strike: ${derivative.strike} • Exp: ${derivative.expiry} • IV: ${derivative.iv}`}
                              {derivative.type === "Futures" && `Expiry: ${derivative.expiry}`}
                            </p>
                          </div>
                          {derivative.leverage && (
                            <Badge variant="destructive" className="text-lg px-3">
                              {derivative.leverage}
                            </Badge>
                          )}
                        </div>
                        {derivative.volume && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">24h Volume</span>
                            <span className="font-semibold">{derivative.volume}</span>
                          </div>
                        )}
                        <Button className="w-full mt-4" data-testid={`button-trade-${derivative.type.toLowerCase()}`}>
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Trade {derivative.type}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
