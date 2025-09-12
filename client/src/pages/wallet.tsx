import { useWeb3 } from "@/hooks/use-web3";
import WalletConnection from "@/components/wallet-connection";
import SendTransaction from "@/components/send-transaction";
import NetworkInfo from "@/components/network-info";
import RecentTransactions from "@/components/recent-transactions";
import SEO from "@/components/seo";

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
      <SEO 
        title="Crypto Wallet - Connect & Manage Your Web3 Gaming Funds"
        description="Securely connect your MetaMask or Web3 wallet to CryptoCasino. Send transactions, check balances, and manage your crypto funds for seamless blockchain gaming experience."
        keywords={["crypto wallet", "MetaMask casino", "web3 wallet integration", "crypto transactions", "blockchain wallet", "ethereum wallet casino", "wallet connect gaming", "crypto balance management", "secure crypto gaming", "web3 gaming wallet"]}
        canonicalUrl="/wallet"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Crypto Wallet - CryptoCasino",
          "description": "Connect and manage your Web3 wallet for secure cryptocurrency gaming transactions.",
          "url": "/wallet",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Crypto Wallet Integration",
            "description": "Web3 wallet integration for cryptocurrency gaming",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "category": "Wallet Services",
              "description": "Secure cryptocurrency wallet management for gaming"
            }
          }
        }}
      />
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
