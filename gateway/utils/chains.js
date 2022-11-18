export const WHITELISTED_CHAINS = [ 'bsc', 'polygon', 'fantom'];
import { ethers } from 'ethers';

export const COUPON_TYPES = {
  bsc: 0,
  polygon: 1,
  fantom: 2,
};

export const NETWORK_IDS = [56, 137, 250];

const NETWORK_ID = {
  bsc: 56,
  polygon: 137,
  fantom: 250,
  goerli: 5,
}

export function getProviderByChainId(chainId) {
  let providerURL;  
  if (chainId === 'bsc') {
    providerURL = 'https://bsc-dataseed2.binance.org';
  }
  if (chainId === 'polygon') {
    providerURL = 'https://polygon-rpc.com';
  }
  if (chainId === 'fantom') {
    providerURL = 'https://rpc.ftm.tools';
  }
  if (chainId === 'goerli') {
    providerURL = 'https://rpc.ankr.com/eth_goerli';
  }
  const provider = new ethers.providers.JsonRpcProvider(providerURL, NETWORK_ID[chainId]);
  return provider;
}

export function getWssProviderByChainId(chainId) {
  let providerURL;
  if (chainId === 'goerli') {
    providerURL = 'wss://yolo-newest-feather.ethereum-goerli.discover.quiknode.pro/accd772215cf91f82e2c049bafa730389eafee39/';
  }
  return new ethers.providers.WebSocketProvider(providerURL, NETWORK_ID[chainId]);;
}