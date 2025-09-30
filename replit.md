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
- NOWPayments API (for universal payments)
- Coinbase Pro SDK (for Sentinel Auto Trading Bot - **Note: Requires migration to Coinbase Advanced Trade API for production**)