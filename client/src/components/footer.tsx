import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Twitter, Github, MessageCircle, Send, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              CODEX
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              The dominant blockchain platform with 55+ production features. Trade, stake, create NFTs, and more.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" asChild data-testid="button-twitter">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild data-testid="button-discord">
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild data-testid="button-telegram">
                <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <Send className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild data-testid="button-github">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/sentinel-bot">
                  <a className="hover:text-foreground transition-colors" data-testid="link-trading-bot">
                    Trading Bot
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/yield-farming">
                  <a className="hover:text-foreground transition-colors" data-testid="link-staking">
                    Staking & Farming
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/nft-creator">
                  <a className="hover:text-foreground transition-colors" data-testid="link-nft-creator">
                    NFT Creator
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/crypto-payments">
                  <a className="hover:text-foreground transition-colors" data-testid="link-payments">
                    Crypto Payments
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/marketplace">
                  <a className="hover:text-foreground transition-colors" data-testid="link-marketplace">
                    Marketplace
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/supreme-command">
                  <a className="hover:text-foreground transition-colors" data-testid="link-supreme-command">
                    Supreme Command
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq">
                  <a className="hover:text-foreground transition-colors" data-testid="link-faq">
                    FAQ & Help
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/analytics">
                  <a className="hover:text-foreground transition-colors" data-testid="link-analytics">
                    Analytics
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="hover:text-foreground transition-colors" data-testid="link-portfolio">
                    Portfolio Tracker
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/achievements">
                  <a className="hover:text-foreground transition-colors" data-testid="link-achievements">
                    Achievements
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/notifications">
                  <a className="hover:text-foreground transition-colors" data-testid="link-notifications">
                    Notifications
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms">
                  <a className="hover:text-foreground transition-colors" data-testid="link-terms">
                    Terms of Service
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="hover:text-foreground transition-colors" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/ethereum/EIPs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  data-testid="link-smart-contracts"
                >
                  Smart Contracts
                  <Globe className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/owner-analytics">
                  <a className="hover:text-foreground transition-colors" data-testid="link-owner-dashboard">
                    Owner Dashboard
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © {currentYear} CODEX. All rights reserved. Built on blockchain technology.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              All Systems Operational
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span>55+ Features</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Multi-Chain Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
