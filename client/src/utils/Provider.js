import { ethers } from 'ethers';

const DEFAULT_RPC = process.env.REACT_APP_DEFAULT_PROVIDER_RPC;
const DEFAULT_CHAIN = process.env.REACT_APP_DEFAULT_NETWORK_ID;

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