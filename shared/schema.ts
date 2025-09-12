import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull().unique(),
  userId: varchar("user_id").references(() => users.id),
  balance: text("balance").default("0"), // Store as wei (string to avoid precision loss)
  network: text("network").notNull().default("mainnet"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  addressLowerIdx: index("wallets_address_lower_idx").on(sql`lower(${table.address})`),
}));

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hash: text("hash").notNull().unique(),
  fromAddress: text("from_address").notNull(),
  toAddress: text("to_address").notNull(),
  amount: text("amount").notNull(), // Store as wei (string to avoid precision loss)
  gasPrice: text("gas_price"), // Store as wei string
  gasUsed: text("gas_used"), // Store as gas units string
  fee: text("fee"), // Store as wei string
  status: text("status").notNull().default("pending"), // pending, confirmed, failed
  network: text("network").notNull().default("mainnet"),
  blockNumber: text("block_number"), // Store as string to avoid overflow
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"),
}, (table) => ({
  fromAddressLowerIdx: index("transactions_from_address_lower_idx").on(sql`lower(${table.fromAddress})`),
  toAddressLowerIdx: index("transactions_to_address_lower_idx").on(sql`lower(${table.toAddress})`),
  timestampIdx: index("transactions_timestamp_idx").on(table.timestamp),
}));

export const networkInfo = pgTable("network_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chainId: text("chain_id").notNull().unique(),
  name: text("name").notNull(),
  rpcUrl: text("rpc_url").notNull(),
  blockExplorerUrl: text("block_explorer_url"),
  symbol: text("symbol").notNull().default("ETH"),
  decimals: text("decimals").notNull().default("18"), // Store as string
  isTestnet: text("is_testnet").notNull().default("false"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tokens = pgTable("tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractAddress: text("contract_address").notNull(),
  chainId: text("chain_id").notNull(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  decimals: text("decimals").notNull().default("18"), // Store as string
  logoUrl: text("logo_url"),
  isVerified: text("is_verified").notNull().default("false"),
  totalSupply: text("total_supply"), // Store as string to avoid precision loss
  description: text("description"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  contractChainIdx: index("tokens_contract_chain_idx").on(table.contractAddress, table.chainId),
  contractLowerIdx: index("tokens_contract_lower_idx").on(sql`lower(${table.contractAddress})`),
  symbolIdx: index("tokens_symbol_idx").on(table.symbol),
  chainIdx: index("tokens_chain_idx").on(table.chainId),
}));

export const tokenBalances = pgTable("token_balances", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull(),
  tokenId: varchar("token_id").notNull().references(() => tokens.id),
  balance: text("balance").notNull().default("0"), // Store as string to avoid precision loss
  lastUpdated: timestamp("last_updated").defaultNow(),
}, (table) => ({
  walletTokenIdx: index("token_balances_wallet_token_idx").on(table.walletAddress, table.tokenId),
  walletLowerIdx: index("token_balances_wallet_lower_idx").on(sql`lower(${table.walletAddress})`),
  lastUpdatedIdx: index("token_balances_last_updated_idx").on(table.lastUpdated),
}));

export const userTokens = pgTable("user_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  walletAddress: text("wallet_address").notNull(),
  tokenId: varchar("token_id").notNull().references(() => tokens.id),
  isHidden: text("is_hidden").notNull().default("false"),
  sortOrder: text("sort_order").default("0"), // For custom ordering
  addedAt: timestamp("added_at").defaultNow(),
}, (table) => ({
  userWalletTokenIdx: index("user_tokens_user_wallet_token_idx").on(table.userId, table.walletAddress, table.tokenId),
  userWalletIdx: index("user_tokens_user_wallet_idx").on(table.userId, table.walletAddress),
  walletLowerIdx: index("user_tokens_wallet_lower_idx").on(sql`lower(${table.walletAddress})`),
}));

export const contracts = pgTable("contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  chainId: text("chain_id").notNull(),
  name: text("name").notNull(),
  abi: jsonb("abi").notNull(), // Store the contract ABI as JSON
  tags: text("tags").array().default(sql`'{}'::text[]`), // Contract categories/tags
  description: text("description"),
  isVerified: text("is_verified").notNull().default("false"),
  sourceCode: text("source_code"), // Optional verified source code
  compiler: text("compiler"), // Compiler version used
  userId: varchar("user_id").references(() => users.id), // User who added this contract
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  addressChainIdx: index("contracts_address_chain_idx").on(table.address, table.chainId),
  addressLowerIdx: index("contracts_address_lower_idx").on(sql`lower(${table.address})`),
  chainIdx: index("contracts_chain_idx").on(table.chainId),
  userIdx: index("contracts_user_idx").on(table.userId),
  tagsIdx: index("contracts_tags_idx").on(table.tags),
}));

export const contractCalls = pgTable("contract_calls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id),
  functionName: text("function_name").notNull(),
  functionSelector: text("function_selector"), // 4-byte function selector
  args: jsonb("args"), // Function arguments as JSON
  fromAddress: text("from_address").notNull(), // Who called the function
  toAddress: text("to_address").notNull(), // Contract address
  txHash: text("tx_hash").unique(), // Transaction hash if it's a write call
  status: text("status").notNull().default("pending"), // pending, confirmed, failed, reverted
  blockNumber: text("block_number"), // Block number if confirmed
  gasUsed: text("gas_used"), // Gas used for the transaction
  gasPrice: text("gas_price"), // Gas price paid
  value: text("value").default("0"), // ETH/native token value sent
  returnData: jsonb("return_data"), // Decoded return data for read calls
  error: text("error"), // Error message if failed
  chainId: text("chain_id").notNull(),
  callType: text("call_type").notNull().default("read"), // read, write, estimate
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  contractIdx: index("contract_calls_contract_idx").on(table.contractId),
  fromAddressLowerIdx: index("contract_calls_from_address_lower_idx").on(sql`lower(${table.fromAddress})`),
  txHashIdx: index("contract_calls_tx_hash_idx").on(table.txHash),
  statusIdx: index("contract_calls_status_idx").on(table.status),
  chainIdx: index("contract_calls_chain_idx").on(table.chainId),
  createdAtIdx: index("contract_calls_created_at_idx").on(table.createdAt),
  functionIdx: index("contract_calls_function_idx").on(table.functionName),
}));

export const contractEventSubs = pgTable("contract_event_subs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id),
  eventName: text("event_name").notNull(),
  eventSignature: text("event_signature"), // Event signature hash
  indexedFilters: jsonb("indexed_filters"), // Filters for indexed parameters
  fromBlock: text("from_block").default("latest"), // Starting block for monitoring
  toBlock: text("to_block"), // Ending block (null for ongoing)
  isActive: text("is_active").notNull().default("true"),
  userId: varchar("user_id").references(() => users.id), // User who created this subscription
  webhookUrl: text("webhook_url"), // Optional webhook for notifications
  lastProcessedBlock: text("last_processed_block"), // Track processed blocks
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  contractIdx: index("contract_event_subs_contract_idx").on(table.contractId),
  eventIdx: index("contract_event_subs_event_idx").on(table.eventName),
  activeIdx: index("contract_event_subs_active_idx").on(table.isActive),
  userIdx: index("contract_event_subs_user_idx").on(table.userId),
  lastBlockIdx: index("contract_event_subs_last_block_idx").on(table.lastProcessedBlock),
}));

export const contractEvents = pgTable("contract_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id),
  subscriptionId: varchar("subscription_id").references(() => contractEventSubs.id),
  eventName: text("event_name").notNull(),
  eventSignature: text("event_signature"),
  args: jsonb("args").notNull(), // Decoded event arguments
  txHash: text("tx_hash").notNull(),
  blockNumber: text("block_number").notNull(),
  blockHash: text("block_hash"),
  logIndex: text("log_index").notNull(), // Position of log in block
  chainId: text("chain_id").notNull(),
  fromAddress: text("from_address"), // Transaction sender
  gasUsed: text("gas_used"),
  gasPrice: text("gas_price"),
  timestamp: timestamp("timestamp").defaultNow(),
}, (table) => ({
  contractIdx: index("contract_events_contract_idx").on(table.contractId),
  subscriptionIdx: index("contract_events_subscription_idx").on(table.subscriptionId),
  txHashIdx: index("contract_events_tx_hash_idx").on(table.txHash),
  blockIdx: index("contract_events_block_idx").on(table.blockNumber),
  chainIdx: index("contract_events_chain_idx").on(table.chainId),
  timestampIdx: index("contract_events_timestamp_idx").on(table.timestamp),
  eventIdx: index("contract_events_event_idx").on(table.eventName),
}));

export const nftCollections = pgTable("nft_collections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chainId: text("chain_id").notNull(),
  contractAddress: text("contract_address").notNull(),
  name: text("name").notNull(),
  slug: text("slug"),
  symbol: text("symbol"),
  imageUrl: text("image_url"),
  bannerImageUrl: text("banner_image_url"),
  description: text("description"),
  externalUrl: text("external_url"),
  isVerified: text("is_verified").notNull().default("false"),
  totalSupply: text("total_supply"),
  floorPrice: text("floor_price"), // Store as string to avoid precision loss
  openseaSlug: text("opensea_slug"),
  contractStandard: text("contract_standard").notNull().default("ERC721"), // ERC721, ERC1155
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  contractChainIdx: index("nft_collections_contract_chain_idx").on(table.contractAddress, table.chainId),
  contractLowerIdx: index("nft_collections_contract_lower_idx").on(sql`lower(${table.contractAddress})`),
  chainIdx: index("nft_collections_chain_idx").on(table.chainId),
  slugIdx: index("nft_collections_slug_idx").on(table.slug),
  verifiedIdx: index("nft_collections_verified_idx").on(table.isVerified),
  standardIdx: index("nft_collections_standard_idx").on(table.contractStandard),
}));

export const nfts = pgTable("nfts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chainId: text("chain_id").notNull(),
  contractAddress: text("contract_address").notNull(),
  tokenId: text("token_id").notNull(), // Store as string to handle large numbers
  standard: text("standard").notNull().default("ERC721"), // ERC721, ERC1155
  name: text("name"),
  description: text("description"),
  imageUrl: text("image_url"),
  imageThumbnailUrl: text("image_thumbnail_url"),
  animationUrl: text("animation_url"),
  externalUrl: text("external_url"),
  attributes: jsonb("attributes"), // Array of trait objects
  metadata: jsonb("metadata"), // Full metadata from tokenURI
  tokenUri: text("token_uri"),
  collectionId: varchar("collection_id").references(() => nftCollections.id),
  rarity: text("rarity"), // Common, Uncommon, Rare, Epic, Legendary
  rarityRank: text("rarity_rank"), // Numeric rank as string
  lastRefreshed: timestamp("last_refreshed").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  contractTokenIdx: index("nfts_contract_token_idx").on(table.contractAddress, table.tokenId, table.chainId),
  contractLowerIdx: index("nfts_contract_lower_idx").on(sql`lower(${table.contractAddress})`),
  chainIdx: index("nfts_chain_idx").on(table.chainId),
  collectionIdx: index("nfts_collection_idx").on(table.collectionId),
  nameIdx: index("nfts_name_idx").on(table.name),
  standardIdx: index("nfts_standard_idx").on(table.standard),
  rarityIdx: index("nfts_rarity_idx").on(table.rarity),
  lastRefreshedIdx: index("nfts_last_refreshed_idx").on(table.lastRefreshed),
}));

export const nftOwnerships = pgTable("nft_ownerships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull(),
  nftId: varchar("nft_id").notNull().references(() => nfts.id),
  balance: text("balance").notNull().default("1"), // For ERC1155 support, store as string
  chainId: text("chain_id").notNull(),
  contractAddress: text("contract_address").notNull(),
  tokenId: text("token_id").notNull(),
  isHidden: text("is_hidden").notNull().default("false"),
  acquisitionDate: timestamp("acquisition_date"),
  acquisitionPrice: text("acquisition_price"), // Store as wei string
  acquisitionCurrency: text("acquisition_currency"), // ETH, MATIC, etc.
  lastUpdated: timestamp("last_updated").defaultNow(),
}, (table) => ({
  walletNftIdx: index("nft_ownerships_wallet_nft_idx").on(table.walletAddress, table.nftId),
  walletLowerIdx: index("nft_ownerships_wallet_lower_idx").on(sql`lower(${table.walletAddress})`),
  chainIdx: index("nft_ownerships_chain_idx").on(table.chainId),
  contractTokenIdx: index("nft_ownerships_contract_token_idx").on(table.contractAddress, table.tokenId),
  lastUpdatedIdx: index("nft_ownerships_last_updated_idx").on(table.lastUpdated),
  hiddenIdx: index("nft_ownerships_hidden_idx").on(table.isHidden),
}));

export const insertNftCollectionSchema = createInsertSchema(nftCollections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNftSchema = createInsertSchema(nfts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastRefreshed: true,
});

export const insertNftOwnershipSchema = createInsertSchema(nftOwnerships).omit({
  id: true,
  lastUpdated: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWalletSchema = createInsertSchema(wallets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  timestamp: true,
});

export const insertNetworkInfoSchema = createInsertSchema(networkInfo).omit({
  id: true,
  updatedAt: true,
});

export const insertTokenSchema = createInsertSchema(tokens).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTokenBalanceSchema = createInsertSchema(tokenBalances).omit({
  id: true,
  lastUpdated: true,
});

export const insertUserTokenSchema = createInsertSchema(userTokens).omit({
  id: true,
  addedAt: true,
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContractCallSchema = createInsertSchema(contractCalls).omit({
  id: true,
  createdAt: true,
});

export const insertContractEventSubSchema = createInsertSchema(contractEventSubs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContractEventSchema = createInsertSchema(contractEvents).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWallet = z.infer<typeof insertWalletSchema>;
export type Wallet = typeof wallets.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertNetworkInfo = z.infer<typeof insertNetworkInfoSchema>;
export type NetworkInfo = typeof networkInfo.$inferSelect;
export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;
export type InsertTokenBalance = z.infer<typeof insertTokenBalanceSchema>;
export type TokenBalance = typeof tokenBalances.$inferSelect;
export type InsertUserToken = z.infer<typeof insertUserTokenSchema>;
export type UserToken = typeof userTokens.$inferSelect;
export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;
export type InsertContractCall = z.infer<typeof insertContractCallSchema>;
export type ContractCall = typeof contractCalls.$inferSelect;
export type InsertContractEventSub = z.infer<typeof insertContractEventSubSchema>;
export type ContractEventSub = typeof contractEventSubs.$inferSelect;
export type InsertContractEvent = z.infer<typeof insertContractEventSchema>;
export type ContractEvent = typeof contractEvents.$inferSelect;
export type InsertNftCollection = z.infer<typeof insertNftCollectionSchema>;
export type NftCollection = typeof nftCollections.$inferSelect;
export type InsertNft = z.infer<typeof insertNftSchema>;
export type Nft = typeof nfts.$inferSelect;
export type InsertNftOwnership = z.infer<typeof insertNftOwnershipSchema>;
export type NftOwnership = typeof nftOwnerships.$inferSelect;
