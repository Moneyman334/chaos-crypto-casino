import { WalletConnector, WalletType } from '../types';
import { MetaMaskConnector } from './metamask';
import { CoinbaseConnector } from './coinbase';

export const connectors: Record<WalletType, WalletConnector> = {
  metamask: new MetaMaskConnector(),
  coinbase: new CoinbaseConnector(),
  walletconnect: null as any,
  trust: null as any,
  phantom: null as any,
  ledger: null as any,
  trezor: null as any,
};

export function getConnector(type: WalletType): WalletConnector {
  const connector = connectors[type];
  if (!connector) {
    throw new Error(`Connector for ${type} not implemented yet`);
  }
  return connector;
}

export function getAvailableConnectors(): WalletConnector[] {
  return Object.values(connectors).filter(c => c !== null);
}

export * from './metamask';
export * from './coinbase';
