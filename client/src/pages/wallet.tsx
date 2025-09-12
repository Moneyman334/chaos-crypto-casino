import { useWeb3 } from "@/hooks/use-web3";
import WalletConnection from "@/components/wallet-connection";
import SendTransaction from "@/components/send-transaction";
import NetworkInfo from "@/components/network-info";
import RecentTransactions from "@/components/recent-transactions";

export default function WalletPage() {
  const { 
    isConnected, 
    account, 
    balance, 
    network, 
    chainId, 
    connectWallet, 
    disconnectWallet
  } = useWeb3();

  const handleConnect = () => {
    if (!isConnected) {
      connectWallet();
    }
  };

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Wallet Connection & Send Transaction */}
          <div className="lg:col-span-2 space-y-6">
            <WalletConnection 
              isConnected={isConnected}
              account={account}
              balance={balance}
              onConnect={handleConnect}
              onDisconnect={disconnectWallet}
            />
            
            {isConnected && (
              <SendTransaction 
                account={account}
                balance={balance}
              />
            )}
          </div>

          {/* Right Column: Network Info & Recent Transactions */}
          <div className="space-y-6">
            <NetworkInfo 
              isConnected={isConnected}
              network={network}
              chainId={chainId}
            />
            
            {isConnected && (
              <RecentTransactions account={account} />
            )}
          </div>
        </div>
      </main>

    </>
  );
}
