const base = {
    id: 168_587_773,
    name: 'Blast Sepolia',
    network: 'Blast Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH',
    },
    rpcUrls: {
        public: { http: ['https://sepolia.blast.io'] },
        default: { http: ['https://sepolia.blast.io'] },
    },
    blockExplorers: {
        etherscan: { name: 'BlastScan', url: 'https://testnet.blastscan.io/' },
        default: { name: 'BlastScan', url: 'https://testnet.blastscan.io/' },
    },
    contracts: {
    },
};

export default base;