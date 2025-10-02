import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  BarChart3,
  Clock,
  Activity,
  Zap,
  Brain,
  AlertTriangle
} from "lucide-react";
import { formatDistance } from "date-fns";

export default function TradingSignalsPage() {
  const { data: signals, isLoading } = useQuery<any[]>({
    queryKey: ['/api/trading/signals'],
  });

  const activeSignals = signals?.filter(s => s.status === 'active') || [];
  const expiredSignals = signals?.filter(s => s.status === 'expired') || [];

  const getSignalIcon = (signal: string) => {
    return signal === 'BUY' ? (
      <TrendingUp className="h-5 w-5 text-green-500" />
    ) : (
      <TrendingDown className="h-5 w-5 text-red-500" />
    );
  };

  const getSignalColor = (signal: string) => {
    return signal === 'BUY' 
      ? 'bg-green-500/10 text-green-500 border-green-500/30' 
      : 'bg-red-500/10 text-red-500 border-red-500/30';
  };

  const getConfidenceColor = (confidence: string) => {
    const conf = parseFloat(confidence);
    if (conf >= 80) return 'text-green-500';
    if (conf >= 60) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const SignalCard = ({ signal }: { signal: any }) => (
    <Card className="premium-card cosmic-dust border-purple-500/30 hover:border-purple-500/60 transition-all duration-300" data-testid={`signal-${signal.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSignalIcon(signal.signal)}
            <div>
              <CardTitle className="text-lg" data-testid={`pair-${signal.id}`}>{signal.pair}</CardTitle>
              <CardDescription>{signal.timeframe} timeframe</CardDescription>
            </div>
          </div>
          <div className="text-right space-y-1">
            <Badge className={getSignalColor(signal.signal)} data-testid={`signal-type-${signal.id}`}>
              {signal.signal}
            </Badge>
            <p className={`text-sm font-bold ${getConfidenceColor(signal.confidence)}`} data-testid={`confidence-${signal.id}`}>
              {signal.confidence}% Confidence
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Target className="h-3 w-3" />
              Entry
            </p>
            <p className="font-bold text-blue-500" data-testid={`entry-${signal.id}`}>${signal.entry}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Target
            </p>
            <p className="font-bold text-green-500" data-testid={`target-${signal.id}`}>${signal.target}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Stop Loss
            </p>
            <p className="font-bold text-red-500" data-testid={`stop-loss-${signal.id}`}>${signal.stopLoss}</p>
          </div>
        </div>

        {signal.analysis && (
          <div className="pt-3 border-t border-border">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              AI Analysis
            </p>
            <p className="text-sm text-muted-foreground">{signal.analysis}</p>
          </div>
        )}

        {signal.indicators && (
          <div className="pt-3 border-t border-border">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Technical Indicators
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(signal.indicators).map(([key, value]: [string, any]) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}: {typeof value === 'number' ? value.toFixed(2) : value}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistance(new Date(signal.createdAt), new Date(), { addSuffix: true })}
          </span>
          {signal.expiresAt && (
            <span>
              Expires {formatDistance(new Date(signal.expiresAt), new Date(), { addSuffix: true })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-float">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 glow-primary">
              <Zap className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" data-testid="title-trading-signals">
                AI Trading Signals
              </h1>
              <p className="text-muted-foreground mt-1">ML-powered market analysis and trade recommendations</p>
            </div>
          </div>
        </div>

        <Card className="premium-card cosmic-dust border-purple-500/30 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Signal Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-500" data-testid="stat-active-signals">{activeSignals.length}</p>
                <p className="text-sm text-muted-foreground">Active Signals</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500" data-testid="stat-buy-signals">
                  {activeSignals.filter(s => s.signal === 'BUY').length}
                </p>
                <p className="text-sm text-muted-foreground">Buy Signals</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-500" data-testid="stat-sell-signals">
                  {activeSignals.filter(s => s.signal === 'SELL').length}
                </p>
                <p className="text-sm text-muted-foreground">Sell Signals</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500" data-testid="stat-avg-confidence">
                  {activeSignals.length > 0 
                    ? (activeSignals.reduce((sum, s) => sum + parseFloat(s.confidence), 0) / activeSignals.length).toFixed(1)
                    : '0'}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" data-testid="tab-active">Active Signals</TabsTrigger>
            <TabsTrigger value="expired" data-testid="tab-expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeSignals.length > 0 ? (
              activeSignals.map(signal => <SignalCard key={signal.id} signal={signal} />)
            ) : (
              <Card className="premium-card cosmic-dust border-purple-500/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Zap className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Active Signals</h3>
                  <p className="text-muted-foreground text-center">
                    AI is analyzing markets. Check back soon for new signals!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4">
            {expiredSignals.length > 0 ? (
              expiredSignals.map(signal => <SignalCard key={signal.id} signal={signal} />)
            ) : (
              <Card className="premium-card cosmic-dust border-purple-500/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Expired Signals</h3>
                  <p className="text-muted-foreground text-center">
                    Past signals will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
