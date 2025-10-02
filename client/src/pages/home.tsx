import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Star, 
  ArrowRight, 
  Shield, 
  Zap, 
  CheckCircle, 
  Award, 
  Lock, 
  Clock,
  Rocket,
  Globe,
  Brain,
  Target,
  Sparkles,
  Trophy,
  Crown
} from "lucide-react";
import { Link } from "wouter";
import { useWeb3 } from "@/hooks/use-web3";
import SEO from "@/components/seo";

export default function HomePage() {
  const { isConnected, connectWallet } = useWeb3();

  const handleConnectWallet = () => {
    if (!isConnected) {
      connectWallet();
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI Trading Oracle",
      description: "89% accuracy predictions with real-time sentiment analysis",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Multi-Sig Treasury",
      description: "$12.4M+ managed with enterprise-grade security",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Synthetic Assets",
      description: "Trade stocks, forex, commodities with 20x leverage",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Advanced DeFi Suite",
      description: "Yield optimization, flash loans, derivatives trading",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Cross-Chain Bridge",
      description: "6 chains, 6 tokens, instant atomic swaps",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Rocket,
      title: "55+ Features",
      description: "Complete Web3 ecosystem in one platform",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { value: "$12.4M+", label: "Treasury Managed", icon: Lock },
    { value: "$1.2B", label: "Daily Volume", icon: TrendingUp },
    { value: "55+", label: "Live Features", icon: Sparkles },
    { value: "89%", label: "AI Accuracy", icon: Brain }
  ];

  return (
    <>
      <SEO 
        title="CODEX - The Dominant Blockchain Platform | Web3 Ecosystem"
        description="CODEX is THE blockchain platform dominating Web3. AI Trading Oracle, Multi-Sig Treasury, DeFi Suite, Synthetic Assets, NFT Marketplace, and 55+ features in one unified ecosystem."
        keywords={["codex blockchain", "dominant web3 platform", "ai trading oracle", "defi suite", "synthetic assets", "multi-sig treasury", "cross-chain bridge", "blockchain ecosystem", "web3 platform", "cryptocurrency trading"]}
        canonicalUrl="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "CODEX - The Dominant Blockchain Platform",
          "description": "The most comprehensive Web3 blockchain platform with AI trading, DeFi, synthetic assets, and 55+ production features.",
          "url": "/"
        }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Epic Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient-shift"></div>
          <div className="cosmic-dust absolute inset-0"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
            {/* Premium Badge */}
            <div className="text-center mb-8 animate-float">
              <Badge className="mb-6 px-6 py-2 text-lg bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-black border-none font-bold glow-primary" data-testid="codex-badge">
                <Crown className="inline h-5 w-5 mr-2" />
                THE DOMINANT BLOCKCHAIN PLATFORM
                <Crown className="inline h-5 w-5 ml-2" />
              </Badge>
            </div>

            {/* Main Title */}
            <h1 className="text-center mb-8">
              <div className="text-7xl md:text-9xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.5)] animate-pulse-slow" data-testid="title-codex">
                CODEX
              </div>
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Where Blockchain Evolution Begins
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-center text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              The <span className="text-purple-400 font-bold">ultimate Web3 ecosystem</span> with AI-powered trading, 
              enterprise DeFi, synthetic assets, and <span className="text-cyan-400 font-bold">55+ production features</span>. 
              Built for traders, institutions, and the future of decentralized finance.
            </p>

            {/* Key Features Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge variant="outline" className="px-4 py-2 text-sm border-green-500/30 bg-green-500/10">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                AI Trading Oracle
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm border-blue-500/30 bg-blue-500/10">
                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                Multi-Sig Treasury
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm border-purple-500/30 bg-purple-500/10">
                <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                Synthetic Assets
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm border-orange-500/30 bg-orange-500/10">
                <Zap className="h-4 w-4 mr-2 text-orange-500" />
                Flash Loans
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm border-cyan-500/30 bg-cyan-500/10">
                <Globe className="h-4 w-4 mr-2 text-cyan-500" />
                Cross-Chain Bridge
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/empire">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white font-bold glow-primary transform hover:scale-105 transition-all" 
                  data-testid="button-enter-codex"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Enter CODEX
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              {!isConnected && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-purple-500/50 hover:bg-purple-500/10" 
                  onClick={handleConnectWallet} 
                  data-testid="button-connect-wallet"
                >
                  <Coins className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              )}
              
              {isConnected && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-green-500/50 bg-green-500/10" 
                  data-testid="button-wallet-connected"
                >
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Wallet Connected
                </Button>
              )}
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <Card key={idx} className="premium-card text-center" data-testid={`stat-${idx}`}>
                  <CardContent className="pt-6">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Dominance Section */}
        <div className="bg-muted/30 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white" data-testid="badge-why-codex">
                Why CODEX Dominates
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                The Most Comprehensive Web3 Ecosystem
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                CODEX isn't just another blockchain platform. It's a complete financial operating system 
                for the decentralized future, combining institutional-grade tools with cutting-edge innovation.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="premium-card cosmic-dust hover:scale-105 transition-all cursor-pointer" 
                  data-testid={`feature-card-${idx}`}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 glow-secondary`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Ecosystem Overview */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white" data-testid="badge-complete-ecosystem">
                Complete Ecosystem
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Everything You Need. One Platform.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Trading & DeFi */}
              <Card className="premium-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 glow-primary">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Trading & DeFi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>AI Trading Oracle with 89% accuracy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Synthetic Assets (Stocks, Forex, Commodities)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Flash Loans up to $200M</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Yield Aggregator across 6 protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Derivatives Trading (100x leverage)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Infrastructure & Security */}
              <Card className="premium-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 glow-secondary">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Infrastructure & Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Multi-Sig Treasury ($12.4M managed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Cross-Chain Bridge (6 chains)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Omniverse Vault (military-grade security)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>DAO Governance & Voting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Multi-Chain Wallet Integration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* NFTs & Creation */}
              <Card className="premium-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">NFTs & Creation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>ERC-20 Token Creator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>ERC-721/1155 NFT Creator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>NFT Gallery & Marketplace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Token Launchpad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>IPFS Integration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Advanced Features */}
              <Card className="premium-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Advanced Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>P2P Lending Platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Prediction Markets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Social Trading Platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Yield Farming Dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Portfolio Analytics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Join the Dominant Platform
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the future of decentralized finance with CODEX. 
              The most advanced blockchain ecosystem ever created.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/empire">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold glow-primary" 
                  data-testid="button-start-now"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/ai-oracle">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-lg border-2" 
                  data-testid="button-explore-features"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
