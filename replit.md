# Overview

This project is a comprehensive Web3 blockchain platform, "Web3 Blockchain Empire," built with React and Express. It provides a complete cryptocurrency ecosystem featuring multi-chain wallet integration (MetaMask), multi-crypto deposits (BTC, ETH, SOL, LTC, DOGE), and universal crypto payments (300+ cryptocurrencies via NOWPayments). Advanced tools include ERC-20 Token and ERC-721/ERC-1155 NFT creators. The platform also integrates an AI-powered Sentinel Auto Trading Bot with diverse strategies, Coinbase Pro integration (pending update to Advanced Trade API), and robust transaction management.

A key differentiator is its "divine visual experience," employing cosmic aesthetics, interactive UI effects, shadcn/ui, and Tailwind CSS for an immersive user interface. The platform is designed for production use, offering smart contract generators, automated trading, and a blockchain-native e-commerce payment system with features like multi-currency support, discount codes, gift cards, loyalty programs, product reviews, wishlists, invoices, and on-chain NFT receipts, all backed by a PostgreSQL database. It also includes a robust Social Media Automation System for Twitter/X.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend utilizes React with TypeScript, Vite, and a component-based structure. It leverages shadcn/ui on Radix UI primitives, styled with Tailwind CSS. State management is handled by React hooks and TanStack Query, with Wouter for client-side routing. A custom Web3 hook enables MetaMask integration. The UI incorporates a "Divine Visual System" with cosmic backgrounds, interactive effects (e.g., cosmic cursor, 3D card tilt, parallax), and advanced animations.

## Backend Architecture
The backend is an Express.js and TypeScript REST API with modular routes for transactions, wallet operations, and network information. It uses an interface-based storage layer with in-memory and PostgreSQL implementations.

## Database Design
PostgreSQL is the primary database, managed with Drizzle ORM. Key tables include `Users`, `Wallets`, `Transactions`, `NetworkInfo`, and specific tables for social media automation, custom payment system, discount codes, gift cards, loyalty points, product reviews, wishlists, invoices, and NFT receipts. UUIDs are used for primary keys, with foreign key relationships and JSONB for metadata.

## Web3 Integration
MetaMask is integrated via the Ethereum provider API, supporting multiple networks (Ethereum, testnets, Polygon). It manages wallet connections, account data, balance retrieval, transaction sending, and network switching.

## Smart Contract Generators
Production-ready generators for ERC-20 tokens (mintable, burnable, pausable) and ERC-721, ERC-721A, ERC-1155 NFTs with IPFS integration.

## Multi-Cryptocurrency Support
Supports BTC, ETH, SOL, LTC, DOGE deposits with QR code generation. Integrates NOWPayments for universal payments across 300+ cryptocurrencies.

## Sentinel Auto Trading Bot
An automated trading bot for Coinbase Pro (requires migration to Advanced Trade API for production) with a backend trading engine, specific database schema, and API routes. It offers five trading strategies, configurable risk management, and real-time monitoring.

## House Vaults System
A player-owned liquidity system allowing ETH staking with varying APY and lock periods, integrated into the Empire Dashboard.

## Social Media Automation System
Automated posting to Twitter/X every 3 hours. Features include multi-account management, flexible scheduling, post history, real-time monitoring, and secure API integration (Twitter API v2). Fully operational with PostgreSQL persistence.

## Custom Payment System
A blockchain-native e-commerce payment system offering instant settlement, no chargebacks, lower fees, and multi-chain support (Ethereum, Base, Polygon, Sepolia). It includes product management, a shopping cart, multi-payment options (MetaMask, NOWPayments), blockchain verification, and order management. Security features include server-side amount calculation, on-chain verification, transaction hash uniqueness, customer wallet binding, and chain validation.

## Masterpiece Features (E-commerce Enhancements)
- **Multi-Currency & Stablecoin Support**: ETH, USDC, DAI, USDT, MATIC across 4 chains, with real-time price conversion API.
- **Discount Codes System**: Percentage/fixed discounts, usage limits, expiry.
- **Gift Cards System**: Blockchain-native gift cards with balance tracking and partial redemption.
- **Loyalty Points System**: Wallet-based loyalty, point earning/redemption, tier system with optional NFT minting.
- **Product Reviews System**: Blockchain-verified reviews from purchasers.
- **Wishlist System**: Wallet-based product wishlists.
- **Invoice & Payment Links**: Shareable payment invoices with multi-currency support.
- **On-Chain NFT Receipts**: Mint NFTs as proof of purchase for permanent records.
- **Refund System**: Partial/full refunds with on-chain tracking.

# External Dependencies

## Core Technologies
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

## Third-Party Integrations
- Zod (validation)
- date-fns (date utilities)
- Wouter (routing)
- node-cron (scheduling)
- NOWPayments API (universal crypto payments)
- Coinbase Pro SDK (for Sentinel Auto Trading Bot - **Note: Requires migration to Coinbase Advanced Trade API for production**)
- Twitter API v2 SDK (twitter-api-v2) (for Social Media Automation)