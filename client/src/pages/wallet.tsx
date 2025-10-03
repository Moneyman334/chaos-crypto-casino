import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeb3 } from "@/hooks/use-web3";
import { Wallet, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function WalletPage() {
  const { account, balance, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const { toast } = useToast();

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Wallet Connection
              </CardTitle>
              <CardDescription>Connect your wallet to access your assets</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={connectWallet} data-testid="button-connect-wallet">
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Connected Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Address</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 bg-muted p-2 rounded text-sm" data-testid="text-wallet-address">
                  {account}
                </code>
                <Button variant="outline" size="sm" onClick={copyAddress} data-testid="button-copy-address">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" asChild data-testid="button-view-explorer">
                  <a href={`https://etherscan.io/address/${account}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Balance</label>
              <p className="text-2xl font-bold mt-1" data-testid="text-balance">
                {balance} ETH
              </p>
            </div>

            <Button variant="destructive" onClick={disconnectWallet} data-testid="button-disconnect">
              Disconnect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
