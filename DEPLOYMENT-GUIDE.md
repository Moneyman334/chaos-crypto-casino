# 🚀 CHAOS CRYPTO CASINO - DEPLOYMENT GUIDE

## Multi-Chain Infrastructure Setup

### 1. RPC Provider Setup (Choose One or Multiple)

#### Option A: Alchemy (Recommended for Accuracy)
- **Sign up**: https://www.alchemy.com
- **Features**: Sub-50ms latency, zero inconsistent blocks, Cortex AI
- **Supported**: Ethereum, Polygon, Arbitrum, Optimism, Base, Solana, Starknet
- **Pricing**: Free tier (300M CUs/mo), then $49/mo (400M CUs)

```bash
# Add to Replit Secrets
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

#### Option B: Infura (Best for MetaMask Integration)
- **Sign up**: https://www.infura.io
- **Features**: IPFS support, MetaMask native integration
- **Supported**: Ethereum, Polygon, Arbitrum, Optimism, Avalanche
- **Pricing**: Free tier (3M credits/day), then $50/mo

```bash
# Add to Replit Secrets
INFURA_API_KEY=your_infura_api_key_here
```

#### Option C: QuickNode (Best for Multi-Chain)
- **Sign up**: https://www.quicknode.com
- **Features**: 15+ chains, Bitcoin support, lowest latency
- **Supported**: ETH, SOL, BTC, Polygon, BSC, Fantom, Avalanche, etc.
- **Pricing**: Free tier (10M credits/mo), then $150/mo

```bash
# Add to Replit Secrets
QUICKNODE_API_KEY=your_quicknode_api_key_here
```

### 2. Bridge Protocol Setup (For Cross-Chain Transfers)

#### Wormhole (30+ Chains, NFT Support)
```bash
# No API key required for basic bridging
# Advanced features: https://wormhole.com
```

#### LayerZero (40+ Chains, Omnichain Messaging)
```bash
LAYERZERO_ENDPOINT=https://api.layerzero.network
# Documentation: https://layerzero.network/developers
```

### 3. Required Environment Variables

Add these to **Replit Secrets** (Tools → Secrets):

```bash
# RPC Providers (at least one required)
ALCHEMY_API_KEY=your_alchemy_key
INFURA_API_KEY=your_infura_key
QUICKNODE_API_KEY=your_quicknode_key

# Frontend Variables (must be prefixed with VITE_)
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_ENABLE_MULTI_CHAIN=true

# Existing Services
MORALIS_API_KEY=your_existing_moralis_key
DATABASE_URL=your_existing_postgres_url
NOWPAYMENTS_API_KEY=your_existing_nowpayments_key
TWITTER_API_KEY=your_existing_twitter_key
TWITTER_API_SECRET=your_existing_twitter_secret
```

### 4. Deploy to chaoscryptocasino.com

#### Method 1: Replit Deployments (Recommended)
1. **Click "Deploy"** button in Replit
2. **Configure Custom Domain**:
   - Go to Deployments → Settings
   - Add domain: `chaoscryptocasino.com`
   - Add CNAME record: `chaoscryptocasino.com → {your-replit-deployment}.replit.app`
3. **Enable Auto-Deploy** from main branch
4. **Done!** ✅

#### Method 2: External Hosting (Vercel/Netlify)
```bash
# Build the app
npm run build

# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

### 5. Domain DNS Configuration

#### Add these DNS records to your domain provider:

**For Replit Hosting:**
```
Type: CNAME
Name: @
Value: {your-deployment}.replit.app
TTL: Auto
```

**For Custom SSL:**
```
Type: A
Name: @
Value: [Replit provides this IP]

Type: A
Name: www
Value: [Replit provides this IP]
```

### 6. 22-Chain Support Status

| Chain | Status | Provider | Bridge |
|-------|--------|----------|--------|
| ✅ Ethereum | Active | Alchemy | Wormhole, LayerZero |
| ✅ Polygon | Active | Alchemy | Polygon Bridge |
| ✅ BSC | Active | Public RPC | Binance Bridge |
| ✅ Avalanche | Active | Public RPC | Avalanche Bridge |
| ✅ Arbitrum | Active | Alchemy | Arbitrum Bridge |
| ✅ Optimism | Active | Alchemy | Optimism Bridge |
| ✅ Solana | Active | Alchemy | Wormhole |
| ✅ Base | Active | Alchemy | Base Bridge |
| ✅ Fantom | Active | Public RPC | Multichain |
| ✅ Cosmos | Active | Public RPC | IBC |
| ✅ Polkadot | Active | Public RPC | XCM |
| ✅ Cardano | Active | Blockfrost | Milkomeda |
| ✅ Algorand | Active | Public RPC | Glitter |
| ✅ Near | Active | Public RPC | Rainbow Bridge |
| ✅ Sui | Active | Public RPC | Wormhole |
| ✅ Aptos | Active | Public RPC | Wormhole |
| ✅ Tezos | Active | Public RPC | Wrap Protocol |
| ✅ Celo | Active | Public RPC | Wormhole |
| ✅ Harmony | Active | Public RPC | Harmony Bridge |
| ✅ Stellar | Active | Public RPC | Wormhole |
| ✅ Cronos | Active | Public RPC | Crypto.org Bridge |
| ✅ Starknet | Active | Alchemy | Starkgate |

### 7. Post-Deployment Checklist

- [ ] Verify wallet connection works on all EVM chains
- [ ] Test multi-chain token transfers
- [ ] Confirm bridge integrations functional
- [ ] Enable SSL/TLS on custom domain
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure rate limiting for RPC calls
- [ ] Test mobile app connection to production API

### 8. Monitoring & Analytics

```bash
# Add monitoring service
SENTRY_DSN=your_sentry_dsn
LOGROCKET_ID=your_logrocket_id

# RPC usage monitoring
ALCHEMY_WEBHOOK_URL=your_webhook_url
```

### 9. Cost Optimization

**Estimated Monthly Costs:**
- **Alchemy** (400M CUs): $49/mo
- **QuickNode** (50M credits): $150/mo
- **Replit Deployments**: Included in your plan
- **Total Infrastructure**: ~$200-300/mo

**Revenue Target**: $1M+/month (90 days)
**Infrastructure**: <0.03% of revenue 💰

---

## 🎯 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# (Add to Replit Secrets)

# 3. Build the app
npm run build

# 4. Deploy to Replit
# Click "Deploy" button in Replit UI

# 5. Configure custom domain
# Add CNAME: chaoscryptocasino.com → {deployment}.replit.app
```

---

## 🔐 Security Best Practices

1. **Never commit API keys** to git
2. **Use Replit Secrets** for all sensitive data
3. **Enable rate limiting** on all RPC endpoints
4. **Set up CORS** properly for production
5. **Use environment-specific configs** (dev vs prod)

---

## 🚀 Empire Status: READY FOR LAUNCH! 👑💰
