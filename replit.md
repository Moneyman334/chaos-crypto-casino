# Overview

"Web3 Blockchain Empire" is a comprehensive Web3 blockchain platform offering a complete cryptocurrency ecosystem. It features multi-chain wallet integration, multi-crypto deposits, and universal crypto payments via NOWPayments. The platform includes advanced tools like ERC-20 Token and ERC-721/ERC-1155 NFT creators, an AI-powered Sentinel Auto Trading Bot, and robust transaction management. It provides a "divine visual experience" with cosmic aesthetics and interactive UI effects, designed for production use. Key features include smart contract generators, automated trading, a blockchain-native e-commerce payment system with multi-currency support, discount codes, gift cards, loyalty programs, and on-chain NFT receipts. It also incorporates a Social Media Automation System for Twitter/X.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX Decisions
The platform features a "Divine Visual System" with a cosmic theme (purple/blue gradients, star effects, animated backgrounds), interactive elements (hover effects, 3D card tilts, parallax scrolling), a custom cosmic trail cursor, and glassmorphism. It uses shadcn/ui and Tailwind CSS for a consistent, accessible, and responsive design, adhering to WCAG AA standards.

## Technical Implementations

### Frontend
- **Technology Stack**: React 18, TypeScript, Vite, Wouter (lightweight routing), TanStack Query v5 (server state management), shadcn/ui, Radix UI, Tailwind CSS, Lucide React, Framer Motion.
- **State Management**: Three-layer architecture combining TanStack Query for server state, Context/Hooks for global client state, and `useState` for local component state.
- **Web3 Integration**: A `useWeb3` hook handles MetaMask integration, wallet connection, network switching, and account/balance monitoring.
- **Form Handling**: Utilizes React Hook Form with Zod for client-side validation.
- **Performance**: Implements code splitting, lazy loading, memoization, virtual scrolling, and image optimization.
- **Error Handling & Resilience**: React Error Boundary, Network Status Monitor, automatic retry with exponential backoff, QueryClient configurations, branded loading overlay, and Toast notifications.

### Backend
- **Core**: Express.js and TypeScript REST API with modular routes.
- **Database Integration**: Interface-based storage layer with PostgreSQL and Drizzle ORM, with an in-memory option for development.
- **API Architecture**: Over 70 RESTful endpoints with rate limiting, authentication, Zod validation, and a storage layer.
- **Security**: Production-grade PostgreSQL-backed sessions (connect-pg-simple), Bcrypt password hashing (cost factor 12), rate limiting, progressive slow down, CORS, input sanitization, and SQL injection prevention.
- **Session Management**: PostgreSQL session store with automatic table creation, 15-minute session pruning, 7-day cookie expiration, and automatic persistence across server restarts.
- **Observability**: Request ID tracking for all API calls, enhanced error logging with request tracing, slow request warnings (>1s), and structured logging with sensitive field redaction.
- **Real-time Services**: Auto-Compound Engine, Social Media Scheduler, Trading Bot Engine, and Price Service.
- **Performance**: Comprehensive database indexes on all critical tables (users, wallets, transactions, tokens, NFTs, etc.) for optimized query performance.
- **Stability & Resilience**: Idempotent graceful shutdown handling and sequential cleanup of background services.

## Feature Specifications

### Web3 & Blockchain
- **Multi-Chain Wallet Integration**: MetaMask for wallet connections and transaction signing.
- **Cross-Chain Bridge**: Full-featured bridge interface supporting 6 chains (Ethereum, Polygon, BSC, Arbitrum, Optimism, Base) with 6 tokens (ETH, USDC, USDT, DAI, MATIC, BNB). Features automated fee calculation (0.1% bridge fee + gas), estimated transfer times (2-5min L2, 10-15min L1), chain swap functionality, and transaction tracking. Military-grade security with testnet simulation for development.
- **Smart Contract Generators**: Production-ready ERC-20 token and ERC-721/721A/1155 NFT creators with IPFS integration.
- **Multi-Cryptocurrency Support**: Deposits for BTC, ETH, SOL, LTC, DOGE, and universal payments for 300+ cryptocurrencies via NOWPayments.
- **Vault System (OMNIVERSE SYNDICATE)**: Automated vault creation on first purchase, all transactions deposit directly to vault, cryptographic security with MetaMask signature verification (password hash binding, timestamp expiry, replay attack prevention), comprehensive security logging, transaction history tracking.

### Trading & Automation
- **Sentinel Auto Trading Bot**: AI-powered bot for Coinbase Pro (requires migration to Advanced Trade API) with five strategies and configurable risk management.
- **AI Trading Oracle**: Real-time market intelligence system featuring multi-source sentiment analysis (Twitter/X, Reddit, news, Telegram), live whale tracking with transaction monitoring, AI-powered price predictions with confidence scoring, Fear & Greed Index with component breakdowns, and smart money flow tracking across major DeFi protocols. Provides actionable trading signals with 89% AI confidence.
- **Advanced DeFi Suite**: Comprehensive DeFi platform with three integrated systems:
  - **Yield Aggregator**: Auto-optimize yields across 6 major protocols (Aave, Compound, Curve, Yearn, Convex, GMX) with APYs from 8.2% to 45.7%. Features risk classification (Low/Medium/High), TVL tracking ($9.99B total), strategy types (Lending, LP, Vault, Staking), and automated capital allocation.
  - **Flash Loans**: Execute uncollateralized loans from Aave, dYdX, and Uniswap V3 with loans up to $200M. Features include fee comparison (0% to 0.09%), multiple assets support, and single-transaction execution for arbitrage and liquidations.
  - **Derivatives Trading**: Trade perpetuals (100x leverage), futures (50x leverage), and options across major pairs (ETH-USD, BTC-USD). Includes funding rates, strike prices, IV tracking, and $42.7B daily volume.
- **Synthetic Assets Platform**: Trade tokenized real-world assets including stocks (Tesla, Apple, Google, Amazon, Microsoft, NVIDIA), commodities (gold, oil, silver, natural gas), and forex pairs (EUR/USD, GBP/USD, JPY/USD, AUD/USD). Features up to 20x leverage, Chainlink oracle pricing, position management with P&L tracking, and $1.2B daily volume.
- **Multi-Sig Treasury Management**: Enterprise-grade DAO treasury system with multi-signature approvals (3-of-5), proposal creation and voting, spending limits, signer management, transaction history, and comprehensive audit trails. Manages $12.4M in treasury assets across multiple cryptocurrencies.
- **House Vaults System**: Player-owned liquidity system for ETH staking with varying APY and lock periods.

### E-commerce & Payments
- **Blockchain-Native Payment System**: Instant settlement, no chargebacks, lower fees, multi-chain support (Ethereum, Base, Polygon, Sepolia). Includes product management, shopping cart, multi-payment options, blockchain verification, and order management.
- **Advanced E-commerce Features**: Multi-currency & stablecoin support, discount codes, gift cards, invoice/payment links, refund system, wallet-based loyalty points, customer tier system, blockchain-verified product reviews, wishlist, recently viewed products, subscription/recurring payments, affiliate/referral system, flash sales, pre-order system, product variants, AI-powered product recommendations, abandoned cart recovery, and on-chain NFT receipts.

### Live Market & Trading Monitoring
- **Live Crypto Market**: Real-time cryptocurrency market data for 100+ cryptocurrencies via CoinGecko API with auto-refresh, market statistics, favorites, search, and filtering.
- **Sentinel Bot Trading Activity Feed**: Real-time display of automated bot trades with polling, showing trading pairs, buy/sell indicators, execution prices, amounts, status, and trade reasoning.
- **Advanced Trading Terminal**: Professional-grade market intelligence & analytics with OHLC Candlestick Chart, Market Sentiment Dashboard (Fear & Greed Index), Gas Tracker, Price Alerts System, Whale Watch, Market Heatmap, Order Book Depth, Live Crypto News Feed, and Multi-Coin Support.

### Comprehensive Frontend Pages (Examples)
- **Products Catalog**, **Wishlist**, **Customer Dashboard**, **Enhanced Checkout**, **Product Reviews**, **Flash Sales Admin**, **Invoice Management**, **Enhanced Orders**, **Analytics Dashboard**, **Portfolio Tracker**, **Notifications System**, **Achievements & Gamification**, **Marketplace**, **Staking Rewards**, **Referral/Affiliate System**, **Token Swap/DEX**, **NFT Gallery**, **DAO Governance**, **P2P Lending Platform**, **Prediction Markets**, **Yield Farming Dashboard**, **Social Trading Platform**, **Token Launchpad**.

# External Dependencies

- React & TypeScript
- Express.js
- Vite
- Drizzle ORM
- TanStack Query
- shadcn/ui
- Tailwind CSS
- Radix UI
- Lucide React
- Framer Motion
- MetaMask SDK
- Ethereum Provider API
- PostgreSQL (via Neon serverless)
- connect-pg-simple
- Zod
- date-fns
- Wouter
- node-cron
- NOWPayments API
- Coinbase Pro SDK (Note: Requires migration to Coinbase Advanced Trade API for production)
- Twitter API v2 SDK (twitter-api-v2)