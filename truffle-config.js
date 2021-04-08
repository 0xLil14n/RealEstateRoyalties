require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = [process.env.PRIVATE_KEY] || "";
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys,
          KOVAN_RPC_URL
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 42
    },
    main: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys,
            MAINNET_RPC_URL
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 1
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys,
          RINKEBY_RPC_URL
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 4
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys,
          ROPSTEN_RPC_URL
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 3
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.6.6',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
    api_keys: {
      etherscan: process.env.ETHERSCAN_API_KEY
    },
    plugins: [
      'truffle-plugin-verify'
    ]
}