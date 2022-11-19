import { ethers } from 'ethers';

const DEFAULT_RPC = process.env.REACT_APP_DEFAULT_PROVIDER_RPC;
const DEFAULT_CHAIN = process.env.REACT_APP_DEFAULT_NETWORK_ID;
const DEFAULT_WEBSOCKET_RPC = process.env.REACT_APP_DEFAULT_WEBSOCKET_RPC;

export function getProvider() {
  let provider;
  if (window.ethereum) {
   provider = new ethers.providers.Web3Provider(window.ethereum, "any");
   return provider;
  } else {
    provider = new ethers.providers.JsonRpcProvider(DEFAULT_RPC, DEFAULT_CHAIN);
    return provider;
  }
}


export function getGenericProvider() {
  return new ethers.providers.JsonRpcProvider(DEFAULT_RPC, "any");
}

export function getGenericWssProvider() {
  return new ethers.providers.WebSocketProvider("wss://ancient-frequent-mound.matic-testnet.discover.quiknode.pro/015b20ff2fdbab65a2990b3bb8e964c41d23b957/", "maticmum");
}