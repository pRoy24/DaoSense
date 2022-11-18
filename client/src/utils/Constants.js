export function getChainById(id) {
  const chainId = id.toString();
  if (chainId === '56') {
    return 'bsc';
  }
  if (chainId === '250') {
    return 'fantom';
  }
  if (chainId === '137') {
    return 'polygon';
  }
  return null;
}