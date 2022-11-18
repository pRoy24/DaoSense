require('dotenv').config();
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    bsc: {
      chainId: 56,
      url: `https://bsc-dataseed.binance.org`,
      accounts: [PRIVATE_KEY]      
    },
    fantom: {
      chainId: 250,
      url: `https://rpc.ftm.tools`,
      accounts: [PRIVATE_KEY]      
    },
    polygon: {
      chainId: 137,
      url: `https://polygon-rpc.com`,
      accounts: [PRIVATE_KEY]      
    },
    goerli: {
      chainId: 5,
      url: 'https://rpc.ankr.com/eth_goerli',
      accounts: [PRIVATE_KEY]
    }
  },
  
  solidity: "0.8.9",
};
