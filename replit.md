# Overview

This is a comprehensive Web3 blockchain empire platform built with React and Express, offering a complete cryptocurrency ecosystem. Key capabilities include multi-chain wallet integration (MetaMask), multi-crypto deposits (BTC, ETH, SOL, LTC, DOGE), universal crypto payments (300+ cryptocurrencies via NOWPayments), and advanced tools like a Token Creator (ERC-20) and NFT Creator (ERC-721, ERC-721A, ERC-1155). The platform also features a revolutionary AI-powered Sentinel Auto Trading Bot with diverse strategies and Coinbase Pro integration, alongside transaction management.

A distinguishing feature is its "divine visual experience," utilizing cosmic aesthetics, interactive effects, shadcn/ui, and Tailwind CSS to create an immersive, otherworldly user interface. The platform is designed for production with smart contract generators and automated trading, all backed by a PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend uses React with TypeScript, Vite, and a component-based architecture. UI components are built with shadcn/ui on Radix UI primitives, styled with Tailwind CSS. State management is handled by React hooks and TanStack Query, while Wouter manages client-side routing. A custom Web3 hook facilitates MetaMask integration for wallet connections and blockchain interactions.

The platform boasts a unique "Divine Visual System" with cosmic backgrounds (animated starfields, aurora effects, particle systems), signature interactive effects (cosmic cursor trail, 3D card tilt, magnetic buttons, liquid morph, parallax, ripple effects, energy fields), and premium visual classes (divine-glow, holographic, celestial-hover, neon-signature). It includes advanced animations like glitch effects and smooth transitions, with accessibility optimizations for reduced motion and mobile performance.

## Backend Architecture
The backend is a REST API built with Express.js and TypeScript, featuring modular routes for transactions, wallet operations, and network information. It employs an interface-based storage layer with in-memory and PostgreSQL implementations.

## Database Design
PostgreSQL is the primary database, utilizing Drizzle ORM. The schema includes `Users`, `Wallets`, `Transactions`, and `NetworkInfo` tables, with UUID primary keys, foreign key relationships, decimal types for financial data, and JSONB for metadata.

## Web3 Integration
MetaMask is integrated via the Ethereum provider API, supporting multiple networks (Ethereum mainnet, testnets, Polygon). It manages wallet connections, account data, balance retrieval, transaction sending, and network switching, including gas estimation and real-time transaction status.

## Smart Contract Generators
The platform includes production-ready generators for:
- **Token Creator**: Deploys custom ERC-20 tokens (mintable, burnable, pausable) using OpenZeppelin contracts (v5.0.0) across multiple networks.
- **NFT Creator**: Deploys custom ERC-721, ERC-721A, and ERC-1155 NFT collections with IPFS integration.

## Multi-Cryptocurrency Support
- **Deposit System**: Supports BTC, ETH, SOL, LTC, DOGE deposits with QR code generation.
- **Universal Payments**: Integrates NOWPayments for 300+ cryptocurrencies, offering payment creation and real-time status tracking.

## Sentinel Auto Trading Bot
This system provides an automated trading bot for Coinbase Pro with a backend trading engine, specific database schema, and API routes for management. It offers three pricing tiers and five trading strategies (Trend Rider, Scalper Pro, Grid Master, DCA Accumulator, Arbitrage Hunter), with configurable risk management features and real-time monitoring. The UI includes a marketplace, dashboard, and configuration settings. Security measures include API secret redaction and encrypted credentials. **Note: This is a development prototype requiring significant updates for production, including authentication, migration to Coinbase Advanced Trade API, improved secret management, engine hardening, rate limiting, database indexing, and comprehensive error handling.**

## House Vaults System
A player-owned liquidity system allowing users to stake ETH and earn profits from casino games. It features three vault tiers with varying APY (15-25%), flexible lock periods (no lock, 7-day, 30-day), and risk-based returns. The system includes database tables for vaults, positions, distributions, and earnings, with a full-stack, production-ready implementation, integrated into the Empire Dashboard.

## Social Media Automation System
A comprehensive automated social media posting system that posts to Twitter/X every 3 hours at scheduled intervals (00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00). The system includes:

### Features:
- **Multi-Account Management**: Connect and manage multiple Twitter/X accounts with secure credential storage
- **Automated Posting**: Posts are automatically published at 3-hour intervals via node-cron scheduler
- **Flexible Scheduling**: Schedule posts for future publishing (timestamps stored in UTC)
- **Post History**: Complete audit trail of all published posts with timestamps and URLs
- **Real-time Monitoring**: Track post status (pending, published, failed) with error logging

### Database Schema:
- `social_accounts`: Stores social media account credentials (platform, accountName, API keys, tokens)
- `scheduled_posts`: Stores posts scheduled for future publishing with status tracking
- `post_history`: Tracks all published posts with external URLs and post IDs

### API Integration:
- Twitter API v2 integration using twitter-api-v2 SDK
- OAuth 1.0a authentication with app key/secret and access token/secret
- Error handling and logging for failed posts with status tracking

### Security:
- Credential redaction in API response logs (masks apiKey, apiSecret, accessToken, accessTokenSecret)
- Secure credential storage in PostgreSQL database
- No credentials exposed in browser or client-side code

### Scheduler Architecture:
- Primary scheduler: Posts every 3 hours on the hour (cron: `0 */3 * * *`)
- Secondary checker: Scans every 5 minutes for due posts (cron: `*/5 * * * *`)
- Concurrency guard prevents duplicate posting
- Post URLs constructed using actual account username and tweet ID

**Production-Ready Status**: Fully operational with PostgreSQL persistence. Users must configure Twitter API credentials (Consumer Key/Secret and Access Token/Secret) for live posting.

## Custom Payment System
A comprehensive e-commerce payment system integrated into the Web3 platform, supporting multiple payment methods including crypto and traditional options. The system provides full order management, payment processing, and transaction tracking.

### Features:
- **Product Management**: Create and manage digital products/services with pricing, descriptions, and metadata
- **Shopping Cart**: Full-featured cart with quantity management and real-time total calculation
- **Multi-Payment Support**: Supports MetaMask (ETH), NOWPayments (300+ cryptocurrencies), and Stripe (fiat)
- **Order Management**: Complete order lifecycle management with status tracking
- **Payment Tracking**: Transaction hash recording, confirmation monitoring, and payment history
- **Webhook Support**: Backend webhook handling for payment provider callbacks

### Database Schema:
- `products`: Stores product catalog with pricing, categories, and crypto price conversions
- `orders`: Tracks customer orders with items, totals, and payment methods
- `payments`: Records payment transactions with provider-specific data and blockchain hashes
- `payment_webhooks`: Logs payment provider webhook events for audit and processing

### Payment Flow:
1. **Product Selection**: Users browse and add items to cart
2. **Order Creation**: Cart is converted to an order with selected payment method
3. **Payment Processing**:
   - **MetaMask**: Client-side transaction signing, ETH sent to merchant address, txHash recorded
   - **NOWPayments**: Creates payment request, generates crypto address, monitors status
   - **Stripe**: (Optional) Standard Stripe checkout flow for fiat payments
4. **Confirmation**: Payment status tracked, order updated on confirmation
5. **Order History**: Users view complete order and payment history via /orders page

### API Endpoints:
- `GET /api/products` - List all products
- `GET /api/products/active` - List active products only
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/wallet/:address` - Get orders by wallet address
- `POST /api/payments/metamask` - Process MetaMask payment
- `POST /api/payments/nowpayments` - Create NOWPayments payment
- `GET /api/payments/order/:orderId` - Get payments for order
- `POST /api/payments/:id/confirm` - Confirm payment completion
- `POST /api/webhooks/payment` - Receive payment provider webhooks

### Frontend Pages:
- `/checkout` - Complete shopping cart and payment checkout experience
- `/orders` - Order history and payment tracking dashboard

### Security Considerations:
- Client-side transaction signing for MetaMask (no private keys on server)
- Transaction hash validation for all crypto payments
- Order expiration (24 hours default) to prevent stale carts
- Payment status tracking with blockchain confirmations
- Webhook signature verification (recommended for production)

**Production-Ready Status**: Core functionality is operational. For production deployment, implement:
1. Real product catalog management interface
2. Blockchain transaction verification (validate txHash, amount, recipient)
3. Webhook signature verification for payment providers
4. Email notifications for order confirmations
5. Admin dashboard for order/payment management
6. Inventory management for physical products
7. Stripe integration if fiat payments needed

# External Dependencies

## Core Dependencies
- React & TypeScript
- Express.js
- Vite
- Drizzle ORM
- TanStack Query

## UI & Styling
- shadcn/ui
- Tailwind CSS
- Radix UI
- Lucide React

## Web3 & Blockchain
- MetaMask SDK
- Ethereum Provider API

## Database & Storage
- PostgreSQL (via Neon serverless)
- connect-pg-simple

## Other Utilities
- Zod
- date-fns
- Wouter
- node-cron
- NOWPayments API (for universal payments)
- Coinbase Pro SDK (for Sentinel Auto Trading Bot - **Note: Requires migration to Coinbase Advanced Trade API for production**)
- Twitter API v2 SDK (twitter-api-v2) (for Social Media Automation)