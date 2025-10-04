import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRightLeft, 
  Zap, 
  Shield, 
  Clock, 
  Wallet, 
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Link } from "wouter";

interface Chain {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  nativeToken: string;
}

interface Token {
  symbol: string;
  name: string;
  balance: string;
}

export default function BridgePage() {
  const { account, isConnected } = useWeb3();
  const { toast } = useToast();
  
  const [fromChain, setFromChain] = useState<string>("ethereum");
  const [toChain, setToChain] = useState<string>("polygon");
  const [amount, setAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("USDC");
  const [estimatedTime, setEstimatedTime] = useState<string>("2-5 minutes");
  const [bridgeFee, setBridgeFee] = useState<string>("0.1%");

  const chains: Chain[] = [
    { id: "ethereum", name: "Ethereum", symbol: "ETH", logo: "⟠", nativeToken: "ETH" },
    { id: "polygon", name: "Polygon", symbol: "MATIC", logo: "◆", nativeToken: "MATIC" },
    { id: "arbitrum", name: "Arbitrum", symbol: "ARB", logo: "🔷", nativeToken: "ETH" },
    { id: "optimism", name: "Optimism", symbol: "OP", logo: "🔴", nativeToken: "ETH" },
    { id: "base", name: "Base", symbol: "BASE", logo: "🔵", nativeToken: "ETH" },
    { id: "bsc", name: "BNB Chain", symbol: "BNB", logo: "💎", nativeToken: "BNB" },
  ];

  const tokens: Token[] = [
    { symbol: "USDC", name: "USD Coin", balance: "0" },
    { symbol: "USDT", name: "Tether", balance: "0" },
    { symbol: "ETH", name: "Ethereum", balance: "0" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", balance: "0" },
    { symbol: "DAI", name: "Dai Stablecoin", balance: "0" },
  ];

  useEffect(() => {
    // Adjust fee based on chains
    if (fromChain === toChain) {
      setBridgeFee("N/A");
      setEstimatedTime("N/A");
    } else {
      setBridgeFee("0.1%");
      setEstimatedTime("2-5 minutes");
    }
  }, [fromChain, toChain]);

  const handleBridge = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to use the bridge",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to bridge",
        variant: "destructive",
      });
      return;
    }

    if (fromChain === toChain) {
      toast({
        title: "Same Chain Selected",
        description: "Please select different source and destination chains",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bridge Transaction Initiated",
      description: `Bridging ${amount} ${selectedToken} from ${chains.find(c => c.id === fromChain)?.name} to ${chains.find(c => c.id === toChain)?.name}`,
    });
  };

  const handleFlipChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const calculateReceiveAmount = () => {
    if (!amount || parseFloat(amount) <= 0) return "0.00";
    const amountNum = parseFloat(amount);
    const feeAmount = amountNum * 0.001; // 0.1% fee
    return (amountNum - feeAmount).toFixed(6);
  };

  const fromChainData = chains.find(c => c.id === fromChain);
  const toChainData = chains.find(c => c.id === toChain);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <ArrowRightLeft className="h-10 w-10 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Cross-Chain Bridge
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Transfer assets seamlessly across 6 blockchain networks
          </p>
        </div>

        {/* Wallet Connection Alert */}
        {!isConnected && (
          <Card className="border-orange-500/50 bg-orange-500/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-500 mb-1">Wallet Connection Required</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect your wallet to start bridging assets across chains
                  </p>
                  <Link href="/wallet-nexus">
                    <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-500/10" data-testid="button-connect-wallet">
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bridge Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Instant Transfers</div>
                  <div className="text-sm text-muted-foreground">2-5 minute average</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="font-semibold">Secure & Audited</div>
                  <div className="text-sm text-muted-foreground">Battle-tested protocols</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold">Low Fees</div>
                  <div className="text-sm text-muted-foreground">Only 0.1% per transfer</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bridge Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Bridge Assets</CardTitle>
            <CardDescription>
              Transfer tokens between different blockchain networks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Chain */}
            <div className="space-y-3">
              <Label>From Chain</Label>
              <Select value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger data-testid="select-from-chain">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{chain.logo}</span>
                        <span>{chain.name}</span>
                        <Badge variant="outline" className="ml-2">{chain.symbol}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Flip Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFlipChains}
                className="rounded-full"
                data-testid="button-flip-chains"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To Chain */}
            <div className="space-y-3">
              <Label>To Chain</Label>
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger data-testid="select-to-chain">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{chain.logo}</span>
                        <span>{chain.name}</span>
                        <Badge variant="outline" className="ml-2">{chain.symbol}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Token Selection */}
            <div className="space-y-3">
              <Label>Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger data-testid="select-token">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center justify-between w-full">
                        <span>{token.symbol}</span>
                        <span className="text-sm text-muted-foreground ml-2">{token.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Amount</Label>
                {isConnected && (
                  <span className="text-sm text-muted-foreground">
                    Balance: {tokens.find(t => t.symbol === selectedToken)?.balance || "0"} {selectedToken}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-20"
                  data-testid="input-amount"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1"
                  onClick={() => setAmount(tokens.find(t => t.symbol === selectedToken)?.balance || "0")}
                  data-testid="button-max"
                >
                  MAX
                </Button>
              </div>
            </div>

            {/* Transaction Details */}
            {amount && parseFloat(amount) > 0 && fromChain !== toChain && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You will receive:</span>
                    <span className="font-semibold">{calculateReceiveAmount()} {selectedToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bridge Fee (0.1%):</span>
                    <span>{(parseFloat(amount) * 0.001).toFixed(6)} {selectedToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Estimated Time:
                    </span>
                    <span>{estimatedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-mono text-xs">{account || "Connect wallet"}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bridge Button */}
            <Button
              onClick={handleBridge}
              disabled={!isConnected || !amount || parseFloat(amount) <= 0 || fromChain === toChain}
              className="w-full"
              size="lg"
              data-testid="button-bridge"
            >
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              {!isConnected ? "Connect Wallet" : fromChain === toChain ? "Select Different Chains" : "Bridge Tokens"}
            </Button>

            {/* Info Notice */}
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-blue-500/10 p-3 rounded-lg">
              <Info className="h-4 w-4 mt-0.5 text-blue-500" />
              <p>
                Your bridged tokens will arrive at the same wallet address on the destination chain. 
                Make sure you have enough gas tokens on both chains to complete the transaction.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Supported Chains Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Networks</CardTitle>
            <CardDescription>Bridge assets across these major blockchain networks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {chains.map((chain) => (
                <div
                  key={chain.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <span className="text-2xl">{chain.logo}</span>
                  <div>
                    <div className="font-semibold">{chain.name}</div>
                    <div className="text-xs text-muted-foreground">{chain.nativeToken}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
