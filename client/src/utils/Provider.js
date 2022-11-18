import { ethers } from 'ethers';

export function getProvider() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  return provider;
}