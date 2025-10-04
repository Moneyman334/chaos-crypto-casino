import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Wallet, RefreshCw, Power, TrendingUp, Zap } from 'lucide-react';
import { useWalletNexus } from '@/lib/wallet-nexus';
import { WalletConnectionModal } from '@/components/wallet-nexus/ConnectionModal';
import { WalletCard } from '@/components/wallet-nexus/WalletCard';
import { usePageTracking } from '@/hooks/use-analytics';

export default function WalletNexusPage() {
  usePageTracking('/wallet-nexus');
  
  const {
    wallets,
    getAllWallets,
    getPrimaryWallet,
    getWalletsByChain,
    refreshBalances,
    disconnectAll,
    isConnecting,
  } = useWalletNexus();

  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allWallets = getAllWallets();
  const primaryWallet = getPrimaryWallet();
  const evmWallets = getWalletsByChain('evm');
  const totalWallets = wallets.size;

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await refreshBalances();
    } catch (error) {
      console.error('Failed to refresh balances:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnectAll = async () => {
    if (window.confirm('Are you sure you want to disconnect all wallets?')) {
      try {
        await disconnectAll();
      } catch (error) {
        console.error('Failed to disconnect all wallets:', error);
      }
    }
  };

  const totalBalanceDisplay = () => {
    if (allWallets.length === 0) return '0.00';
    const total = allWallets.reduce((sum, w) => {
      const balance = parseFloat(w.balance || '0');
      return sum + balance;
    }, 0);
    return total.toFixed(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient" data-testid="text-page-title">
              ⚡ Codex Wallet Nexus
            </h1>
            <p className="text-gray-400 mt-2">
              The future of multi-wallet management - Connect unlimited wallets, manage all chains
            </p>
          </div>
          <div className="flex gap-3">
            {totalWallets > 0 && (
              <>
                <Button
                  onClick={handleRefreshAll}
                  disabled={isRefreshing}
                  variant="outline"
                  className="border-purple-500/50 hover:bg-purple-500/20"
                  data-testid="button-refresh-all"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh All
                </Button>
                <Button
                  onClick={handleDisconnectAll}
                  variant="outline"
                  className="border-red-500/50 hover:bg-red-500/20 text-red-400"
                  data-testid="button-disconnect-all"
                >
                  <Power className="h-4 w-4 mr-2" />
                  Disconnect All
                </Button>
              </>
            )}
            <Button
              onClick={() => setIsConnectionModalOpen(true)}
              disabled={isConnecting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              data-testid="button-connect-wallet"
            >
              <Plus className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-700/20 border-purple-500/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Total Wallets</span>
                <Wallet className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white" data-testid="text-total-wallets">
                {totalWallets}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {evmWallets.length} EVM wallets
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 border-blue-500/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Combined Balance</span>
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white" data-testid="text-combined-balance">
                {totalBalanceDisplay()}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                ETH equivalent
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/40 to-yellow-700/20 border-yellow-500/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Primary Wallet</span>
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="text-lg font-bold text-white truncate" data-testid="text-primary-wallet">
                {primaryWallet ? primaryWallet.name : 'None'}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {primaryWallet ? `${primaryWallet.address.slice(0, 6)}...${primaryWallet.address.slice(-4)}` : 'No primary wallet set'}
              </div>
            </div>
          </Card>
        </div>

        {allWallets.length === 0 ? (
          <Card className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🔗</div>
              <h2 className="text-2xl font-bold text-white mb-2">No Wallets Connected</h2>
              <p className="text-gray-400 mb-6">
                Connect your first wallet to start using Codex Wallet Nexus
              </p>
              <Button
                onClick={() => setIsConnectionModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                data-testid="button-connect-first-wallet"
              >
                <Plus className="h-4 w-4 mr-2" />
                Connect Your First Wallet
              </Button>
            </div>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-gray-900/50 border border-purple-500/30">
              <TabsTrigger value="all" data-testid="tab-all-wallets">
                All Wallets ({allWallets.length})
              </TabsTrigger>
              <TabsTrigger value="evm" data-testid="tab-evm-wallets">
                EVM ({evmWallets.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allWallets.map((wallet) => (
                  <WalletCard key={wallet.id} wallet={wallet} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="evm" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evmWallets.map((wallet) => (
                  <WalletCard key={wallet.id} wallet={wallet} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        <Card className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">✨ What makes Codex Wallet Nexus revolutionary?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <span className="text-purple-400 font-semibold">🔗 Multi-Wallet Support:</span> Connect unlimited wallets simultaneously
              </div>
              <div>
                <span className="text-purple-400 font-semibold">⚡ Instant Switching:</span> Switch between wallets with one click
              </div>
              <div>
                <span className="text-purple-400 font-semibold">🌐 Multi-Chain:</span> Support for EVM chains and more coming soon
              </div>
              <div>
                <span className="text-purple-400 font-semibold">💎 Unified Interface:</span> Manage all your wallets in one place
              </div>
              <div>
                <span className="text-purple-400 font-semibold">🔐 Enhanced Security:</span> Advanced protection and fraud detection
              </div>
              <div>
                <span className="text-purple-400 font-semibold">💾 Session Persistence:</span> Auto-reconnect your wallets
              </div>
            </div>
          </div>
        </Card>
      </div>

      <WalletConnectionModal
        isOpen={isConnectionModalOpen}
        onClose={() => setIsConnectionModalOpen(false)}
      />

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
