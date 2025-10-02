import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertCircle,
  Sparkles,
  Eye,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Users,
  Zap
} from "lucide-react";

const sentimentData = {
  overall: {
    score: 72,
    label: "Bullish",
    change: "+12%",
    trend: "up"
  },
  sources: [
    { name: "Twitter/X", sentiment: 78, volume: "125K posts", trend: "up" },
    { name: "Reddit", sentiment: 68, volume: "45K posts", trend: "up" },
    { name: "News", sentiment: 65, volume: "2.3K articles", trend: "neutral" },
    { name: "Telegram", sentiment: 82, volume: "89K messages", trend: "up" }
  ],
  fearGreed: {
    score: 68,
    label: "Greed",
    components: {
      volatility: 75,
      momentum: 82,
      volume: 65,
      dominance: 58,
      trends: 71
    }
  }
};

const whaleActivities = [
  { 
    id: 1, 
    wallet: "0x742d...a9b4", 
    action: "Bought", 
    amount: "1,250 ETH", 
    value: "$2.4M",
    asset: "ETH",
    time: "2 minutes ago",
    impact: "high"
  },
  { 
    id: 2, 
    wallet: "0x8f3c...2d1e", 
    action: "Sold", 
    amount: "500K USDC", 
    value: "$500K",
    asset: "USDC",
    time: "8 minutes ago",
    impact: "medium"
  },
  { 
    id: 3, 
    wallet: "0x1a2b...c3d4", 
    action: "Transferred", 
    amount: "10M SHIB", 
    value: "$85K",
    asset: "SHIB",
    time: "15 minutes ago",
    impact: "low"
  },
  { 
    id: 4, 
    wallet: "0x9e8d...7c6b", 
    action: "Bought", 
    amount: "2,500 MATIC", 
    value: "$1.8K",
    asset: "MATIC",
    time: "23 minutes ago",
    impact: "low"
  },
  { 
    id: 5, 
    wallet: "0x5f4e...3d2c", 
    action: "Sold", 
    amount: "100 BTC", 
    value: "$6.2M",
    asset: "BTC",
    time: "35 minutes ago",
    impact: "high"
  },
];

const aiPredictions = [
  {
    id: 1,
    asset: "ETH",
    prediction: "Bullish",
    confidence: 87,
    targetPrice: "$2,450",
    timeframe: "24h",
    signals: ["Strong buying pressure", "Whale accumulation", "Positive sentiment"],
    risk: "Medium"
  },
  {
    id: 2,
    asset: "BTC",
    prediction: "Neutral",
    confidence: 62,
    targetPrice: "$63,500",
    timeframe: "24h",
    signals: ["Consolidating", "Mixed signals", "Reduced volume"],
    risk: "Low"
  },
  {
    id: 3,
    asset: "SOL",
    prediction: "Bullish",
    confidence: 91,
    targetPrice: "$145",
    timeframe: "48h",
    signals: ["Breakout pattern", "High social volume", "Ecosystem growth"],
    risk: "High"
  },
  {
    id: 4,
    asset: "MATIC",
    prediction: "Bearish",
    confidence: 74,
    targetPrice: "$0.65",
    timeframe: "24h",
    signals: ["Resistance rejection", "Whale selling", "Declining momentum"],
    risk: "Medium"
  }
];

const smartMoneyFlow = [
  { protocol: "Uniswap", flow: "$45.2M", direction: "in", change: "+125%" },
  { protocol: "Aave", flow: "$32.8M", direction: "in", change: "+87%" },
  { protocol: "Curve", flow: "$28.1M", direction: "out", change: "-45%" },
  { protocol: "Compound", flow: "$19.5M", direction: "in", change: "+56%" },
  { protocol: "GMX", flow: "$15.3M", direction: "in", change: "+102%" }
];

export default function AITradingOracle() {
  const [selectedAsset, setSelectedAsset] = useState("ETH");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-float">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 glow-primary animate-pulse-slow">
              <Brain className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" data-testid="title-ai-oracle">
                AI Trading Oracle
              </h1>
              <p className="text-muted-foreground mt-1">Real-time Sentiment • Whale Tracking • AI Predictions</p>
            </div>
          </div>

          {/* Overall Sentiment */}
          <Card className="premium-card cosmic-dust border-purple-500/30 mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Market Sentiment</p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {sentimentData.overall.score}%
                    </div>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                      {sentimentData.overall.label}
                    </Badge>
                  </div>
                  <Progress value={sentimentData.overall.score} className="h-2" />
                  <p className="text-sm text-green-500 mt-2">{sentimentData.overall.change} from yesterday</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Fear & Greed Index</p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {sentimentData.fearGreed.score}
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                      {sentimentData.fearGreed.label}
                    </Badge>
                  </div>
                  <Progress value={sentimentData.fearGreed.score} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">Extreme Greed zone</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">AI Confidence</p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      89%
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                      High
                    </Badge>
                  </div>
                  <Progress value={89} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">4/4 models agree</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions" data-testid="tab-predictions">
              <Target className="h-4 w-4 mr-2" />
              AI Predictions
            </TabsTrigger>
            <TabsTrigger value="sentiment" data-testid="tab-sentiment">
              <Activity className="h-4 w-4 mr-2" />
              Sentiment
            </TabsTrigger>
            <TabsTrigger value="whales" data-testid="tab-whales">
              <Eye className="h-4 w-4 mr-2" />
              Whale Tracking
            </TabsTrigger>
            <TabsTrigger value="smart-money" data-testid="tab-smart-money">
              <Zap className="h-4 w-4 mr-2" />
              Smart Money
            </TabsTrigger>
          </TabsList>

          {/* AI Predictions */}
          <TabsContent value="predictions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiPredictions.map(prediction => (
                <Card key={prediction.id} className="premium-card" data-testid={`card-prediction-${prediction.asset.toLowerCase()}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-500" />
                        {prediction.asset}
                      </CardTitle>
                      <Badge 
                        variant={prediction.prediction === "Bullish" ? "default" : prediction.prediction === "Bearish" ? "destructive" : "secondary"}
                        className="text-sm"
                      >
                        {prediction.prediction}
                      </Badge>
                    </div>
                    <CardDescription>AI Confidence: {prediction.confidence}%</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Progress value={prediction.confidence} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Target Price</span>
                        <span className="font-bold">{prediction.targetPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Timeframe</span>
                        <span className="font-semibold">{prediction.timeframe}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Risk Level</span>
                        <Badge variant={prediction.risk === "High" ? "destructive" : prediction.risk === "Medium" ? "secondary" : "outline"} className="text-xs">
                          {prediction.risk}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">Key Signals:</p>
                      <div className="space-y-1">
                        {prediction.signals.map((signal, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                            <span className="text-muted-foreground">{signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" data-testid={`button-trade-${prediction.asset.toLowerCase()}`}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Trade {prediction.asset}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sentiment Analysis */}
          <TabsContent value="sentiment" className="space-y-4">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Multi-Source Sentiment Analysis</CardTitle>
                <CardDescription>Aggregated sentiment from social media, news, and community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sentimentData.sources.map((source, idx) => (
                  <div key={idx} className="space-y-2" data-testid={`source-${source.name.toLowerCase().replace('/', '-')}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold">{source.name}</p>
                          <p className="text-sm text-muted-foreground">{source.volume}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {source.trend === "up" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : source.trend === "down" ? (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        ) : (
                          <Activity className="h-5 w-5 text-yellow-500" />
                        )}
                        <span className="font-bold text-lg">{source.sentiment}%</span>
                      </div>
                    </div>
                    <Progress value={source.sentiment} className="h-2" />
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t">
                  <p className="font-semibold mb-4">Fear & Greed Components</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(sentimentData.fearGreed.components).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key}</span>
                          <span className="font-semibold">{value}%</span>
                        </div>
                        <Progress value={value} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Whale Tracking */}
          <TabsContent value="whales" className="space-y-4">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Whale Activity
                </CardTitle>
                <CardDescription>Track large transactions from whale wallets in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-3">
                    {whaleActivities.map(activity => (
                      <Card 
                        key={activity.id} 
                        className={`border-l-4 ${
                          activity.action === "Bought" 
                            ? "border-l-green-500 bg-green-500/5" 
                            : activity.action === "Sold"
                            ? "border-l-red-500 bg-red-500/5"
                            : "border-l-blue-500 bg-blue-500/5"
                        }`}
                        data-testid={`whale-activity-${activity.id}`}
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Wallet className={`h-5 w-5 ${
                                activity.action === "Bought" 
                                  ? "text-green-500" 
                                  : activity.action === "Sold"
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`} />
                              <div>
                                <p className="font-mono text-sm font-semibold">{activity.wallet}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3" />
                                  {activity.time}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                activity.impact === "high" 
                                  ? "destructive" 
                                  : activity.impact === "medium"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {activity.impact} impact
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              <p className="text-sm text-muted-foreground">{activity.action}</p>
                              <p className="font-bold">{activity.amount}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Value</p>
                              <p className="font-bold">{activity.value}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Money Flow */}
          <TabsContent value="smart-money" className="space-y-4">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Smart Money Flow
                </CardTitle>
                <CardDescription>Track institutional and whale capital movements across DeFi protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartMoneyFlow.map((flow, idx) => (
                    <Card key={idx} className="border-2" data-testid={`flow-${flow.protocol.toLowerCase()}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              flow.direction === "in" ? "bg-green-500/10" : "bg-red-500/10"
                            }`}>
                              {flow.direction === "in" ? (
                                <TrendingUp className="h-5 w-5 text-green-500" />
                              ) : (
                                <TrendingDown className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-lg">{flow.protocol}</p>
                              <p className="text-sm text-muted-foreground">
                                {flow.direction === "in" ? "Net Inflow" : "Net Outflow"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-2xl">{flow.flow}</p>
                            <p className={`text-sm font-semibold ${
                              flow.direction === "in" ? "text-green-500" : "text-red-500"
                            }`}>
                              {flow.change}
                            </p>
                          </div>
                        </div>
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
