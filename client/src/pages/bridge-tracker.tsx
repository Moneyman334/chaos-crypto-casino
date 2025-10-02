import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWeb3 } from "@/hooks/use-web3";
import { 
  ArrowLeftRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Loader2,
  ExternalLink,
  Network,
  Coins
} from "lucide-react";
import { formatDistance } from "date-fns";

export default function BridgeTrackerPage() {
  const { account } = useWeb3();

  const { data: transactions, isLoading } = useQuery<any[]>({
    queryKey: ['/api/bridge/transactions', account],
    enabled: !!account,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-float">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 glow-secondary">
              <ArrowLeftRight className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]" data-testid="title-bridge-tracker">
                Bridge Tracker
              </h1>
              <p className="text-muted-foreground mt-1">Track your cross-chain transfers in real-time</p>
            </div>
          </div>
        </div>

        {!account ? (
          <Card className="premium-card cosmic-dust border-purple-500/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Network className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground text-center">
                Connect your wallet to track bridge transactions
              </p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <Card className="premium-card cosmic-dust border-purple-500/30">
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </CardContent>
          </Card>
        ) : transactions && transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((tx: any) => (
              <Card key={tx.id} className="premium-card cosmic-dust border-blue-500/30 hover:border-blue-500/60 transition-all duration-300" data-testid={`bridge-tx-${tx.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(tx.status)}
                      <div>
                        <CardTitle className="text-lg">
                          {tx.sourceChain} → {tx.destinationChain}
                        </CardTitle>
                        <CardDescription>
                          {tx.amount} {tx.token}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(tx.status)} data-testid={`status-${tx.id}`}>
                      {tx.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Estimated Time</p>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tx.estimatedTime || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Bridge Fee</p>
                      <p className="font-medium flex items-center gap-1">
                        <Coins className="h-4 w-4" />
                        {tx.fee || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {tx.sourceTxHash && (
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Source Transaction</p>
                      <a 
                        href={`https://etherscan.io/tx/${tx.sourceTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                        data-testid={`source-tx-link-${tx.id}`}
                      >
                        {tx.sourceTxHash.slice(0, 10)}...{tx.sourceTxHash.slice(-8)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {tx.destinationTxHash && (
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Destination Transaction</p>
                      <a 
                        href={`https://etherscan.io/tx/${tx.destinationTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                        data-testid={`dest-tx-link-${tx.id}`}
                      >
                        {tx.destinationTxHash.slice(0, 10)}...{tx.destinationTxHash.slice(-8)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      {formatDistance(new Date(tx.createdAt), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="premium-card cosmic-dust border-purple-500/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ArrowLeftRight className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Bridge Transactions</h3>
              <p className="text-muted-foreground text-center">
                You haven't made any cross-chain transfers yet
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
