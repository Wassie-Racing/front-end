const base = {
  id: 8_453,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://developer-access-mainnet.base.org'] },
    default: { http: ['https://developer-access-mainnet.base.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'BaseScan', url: 'https://basescan.org/' },
    default: { name: 'BaseScan', url: 'https://basescan.org/' },
  },
  contracts: {
  },
};

export default base;