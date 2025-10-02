import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWeb3 } from "@/hooks/use-web3";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield,
  Wallet,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  Vote,
  TrendingUp,
  Lock,
  Unlock,
  AlertTriangle,
  Plus
} from "lucide-react";

const treasuryBalance = {
  total: "$12.4M",
  assets: [
    { symbol: "ETH", amount: "2,450", value: "$4.9M", percentage: 40 },
    { symbol: "USDC", amount: "3,200,000", value: "$3.2M", percentage: 26 },
    { symbol: "DAI", amount: "2,100,000", value: "$2.1M", percentage: 17 },
    { symbol: "WBTC", amount: "35", value: "$2.2M", percentage: 17 }
  ]
};

const signers = [
  { address: "0x742d...a9b4", name: "Alice.eth", role: "Founder", signed: 12, pending: 2 },
  { address: "0x8f3c...2d1e", name: "Bob.eth", role: "CTO", signed: 15, pending: 1 },
  { address: "0x1a2b...c3d4", name: "Carol.eth", role: "CFO", signed: 18, pending: 3 },
  { address: "0x9e8d...7c6b", name: "Dave.eth", role: "COO", signed: 10, pending: 2 },
  { address: "0x5f4e...3d2c", name: "Eve.eth", role: "CMO", signed: 8, pending: 1 }
];

const proposals = [
  {
    id: 1,
    title: "Allocate $500K to Marketing Campaign",
    description: "Q4 marketing budget for ecosystem growth",
    amount: "$500,000",
    asset: "USDC",
    recipient: "0x742d...a9b4",
    required: 3,
    current: 2,
    status: "pending",
    deadline: "48 hours",
    signers: ["Alice.eth", "Bob.eth"],
    created: "2 days ago"
  },
  {
    id: 2,
    title: "Developer Grant Payment",
    description: "Milestone 3 completion for Protocol Upgrade",
    amount: "50 ETH",
    asset: "ETH",
    recipient: "0x8f3c...2d1e",
    required: 3,
    current: 3,
    status: "approved",
    deadline: "Approved",
    signers: ["Alice.eth", "Bob.eth", "Carol.eth"],
    created: "5 days ago"
  },
  {
    id: 3,
    title: "Treasury Diversification",
    description: "Convert $1M USDC to ETH at current market price",
    amount: "$1,000,000",
    asset: "USDC",
    recipient: "Treasury",
    required: 4,
    current: 1,
    status: "pending",
    deadline: "72 hours",
    signers: ["Alice.eth"],
    created: "12 hours ago"
  },
  {
    id: 4,
    title: "Security Audit Payment",
    description: "Final payment for Q3 security audit",
    amount: "$200,000",
    asset: "USDC",
    recipient: "0x1a2b...c3d4",
    required: 3,
    current: 0,
    status: "rejected",
    deadline: "Expired",
    signers: [],
    created: "10 days ago"
  }
];

const recentTransactions = [
  { id: 1, type: "Withdrawal", amount: "100 ETH", to: "Marketing", status: "Executed", time: "2 hours ago" },
  { id: 2, type: "Deposit", amount: "500K USDC", from: "Revenue", status: "Completed", time: "1 day ago" },
  { id: 3, type: "Withdrawal", amount: "50K DAI", to: "Development", status: "Executed", time: "3 days ago" },
  { id: 4, type: "Swap", amount: "200K USDC → ETH", to: "Treasury", status: "Completed", time: "5 days ago" }
];

export default function MultiSigTreasury() {
  const { account } = useWeb3();
  const { toast } = useToast();
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    amount: "",
    recipient: ""
  });

  const signProposal = useMutation({
    mutationFn: async (proposalId: number) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return proposalId;
    },
    onSuccess: () => {
      toast({
        title: "✅ Proposal Signed!",
        description: "Your signature has been recorded on-chain",
      });
    }
  });

  const createProposal = useMutation({
    mutationFn: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "📝 Proposal Created!",
        description: "Waiting for signatures from other signers",
      });
      setNewProposal({ title: "", description: "", amount: "", recipient: "" });
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-float">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 glow-secondary animate-pulse-slow">
              <Shield className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]" data-testid="title-multi-sig">
                Multi-Sig Treasury
              </h1>
              <p className="text-muted-foreground mt-1">Secure DAO Treasury Management • Multi-Signature Approvals</p>
            </div>
          </div>

          {/* Treasury Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Wallet className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Treasury</p>
                    <p className="text-2xl font-bold" data-testid="text-treasury-total">{treasuryBalance.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Signers</p>
                    <p className="text-2xl font-bold" data-testid="text-signers">{signers.length}/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Proposals</p>
                    <p className="text-2xl font-bold" data-testid="text-pending">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Shield className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Required Sigs</p>
                    <p className="text-2xl font-bold" data-testid="text-required-sigs">3/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset Breakdown */}
          <Card className="premium-card cosmic-dust mb-6">
            <CardHeader>
              <CardTitle>Treasury Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treasuryBalance.assets.map((asset, idx) => (
                  <div key={idx} className="space-y-2" data-testid={`asset-${asset.symbol.toLowerCase()}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.amount} tokens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{asset.value}</p>
                        <p className="text-sm text-muted-foreground">{asset.percentage}%</p>
                      </div>
                    </div>
                    <Progress value={asset.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proposals" data-testid="tab-proposals">
              <FileText className="h-4 w-4 mr-2" />
              Proposals
            </TabsTrigger>
            <TabsTrigger value="create" data-testid="tab-create">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </TabsTrigger>
            <TabsTrigger value="signers" data-testid="tab-signers">
              <Users className="h-4 w-4 mr-2" />
              Signers
            </TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">
              <Clock className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Proposals */}
          <TabsContent value="proposals" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {proposals.map(proposal => (
                <Card 
                  key={proposal.id}
                  className={`premium-card border-l-4 ${
                    proposal.status === "approved" 
                      ? "border-l-green-500" 
                      : proposal.status === "rejected"
                      ? "border-l-red-500"
                      : "border-l-yellow-500"
                  }`}
                  data-testid={`proposal-${proposal.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{proposal.title}</CardTitle>
                          <Badge 
                            variant={
                              proposal.status === "approved" 
                                ? "default" 
                                : proposal.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">{proposal.amount}</p>
                        <p className="text-sm text-muted-foreground">{proposal.asset}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Recipient</p>
                        <p className="font-mono font-semibold">{proposal.recipient}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="font-semibold">{proposal.created}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Signatures ({proposal.current}/{proposal.required})</span>
                        <span className="text-muted-foreground">{proposal.deadline}</span>
                      </div>
                      <Progress 
                        value={(proposal.current / proposal.required) * 100} 
                        className="h-2"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {proposal.signers.map((signer, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            {signer}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {proposal.status === "pending" && (
                      <Button
                        className="w-full"
                        onClick={() => signProposal.mutate(proposal.id)}
                        disabled={signProposal.isPending}
                        data-testid={`button-sign-${proposal.id}`}
                      >
                        {signProposal.isPending ? (
                          <>
                            <Shield className="h-4 w-4 mr-2 animate-spin" />
                            Signing...
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Sign Proposal
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Proposal */}
          <TabsContent value="create">
            <Card className="premium-card cosmic-dust">
              <CardHeader>
                <CardTitle>Create New Proposal</CardTitle>
                <CardDescription>Submit a new treasury transaction for multi-sig approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Proposal Title</label>
                  <Input
                    placeholder="e.g., Marketing Campaign Budget"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                    data-testid="input-proposal-title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="Detailed description of the proposal"
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                    data-testid="input-proposal-description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={newProposal.amount}
                      onChange={(e) => setNewProposal({ ...newProposal, amount: e.target.value })}
                      data-testid="input-proposal-amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recipient Address</label>
                    <Input
                      placeholder="0x..."
                      value={newProposal.recipient}
                      onChange={(e) => setNewProposal({ ...newProposal, recipient: e.target.value })}
                      data-testid="input-proposal-recipient"
                    />
                  </div>
                </div>

                <Card className="bg-blue-500/10 border-blue-500/30">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <p className="text-muted-foreground">
                        This proposal will require 3 out of 5 signatures to execute. All signers will be notified.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  className="w-full h-12"
                  onClick={() => createProposal.mutate(newProposal)}
                  disabled={!account || !newProposal.title || !newProposal.amount || createProposal.isPending}
                  data-testid="button-create-proposal"
                >
                  {createProposal.isPending ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-2" />
                      Create Proposal
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signers */}
          <TabsContent value="signers">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Authorized Signers</CardTitle>
                <CardDescription>Multi-signature wallet signers and their activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {signers.map((signer, idx) => (
                    <Card key={idx} className="border-2" data-testid={`signer-${idx}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <Users className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-semibold">{signer.name}</p>
                              <p className="text-sm text-muted-foreground font-mono">{signer.address}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge>{signer.role}</Badge>
                            <div className="flex gap-3 mt-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Signed: </span>
                                <span className="font-semibold">{signer.signed}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Pending: </span>
                                <span className="font-semibold text-orange-500">{signer.pending}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>All executed treasury transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {recentTransactions.map(tx => (
                      <Card key={tx.id} className="border-2" data-testid={`transaction-${tx.id}`}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                tx.type === "Deposit" ? "bg-green-500/10" : "bg-blue-500/10"
                              }`}>
                                {tx.type === "Deposit" ? (
                                  <TrendingUp className="h-5 w-5 text-green-500" />
                                ) : (
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold">{tx.type}</p>
                                <p className="text-sm text-muted-foreground">{tx.amount}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{tx.status}</Badge>
                              <p className="text-sm text-muted-foreground mt-1">{tx.time}</p>
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
        </Tabs>
      </div>
    </div>
  );
}
