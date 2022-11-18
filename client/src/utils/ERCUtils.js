import contractABI from '../contracts/abi/DSCommunityPlot.json';
import { ethers } from 'ethers';
import { getProvider, getGenericProvider } from './Provider';
import axios from 'axios';

const API_SERVER = process.env.REACT_APP_API_SERVER;
const CONTRACT_ADDRESS = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS;

export async function mintDSPlot(address) {
  const provider = getProvider();
  const signer = provider.getSigner();

  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  const contractWithSigner = Contract.connect(signer);
  const txResponse = await contractWithSigner.functions.mintUser(address);
  return txResponse;
}

export async function getMintsForUser(address) {
  const provider = getProvider();
  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  const ownerBalance = await Contract.balanceOf(address);
  const ownerBalanceVal = ownerBalance.toString();
  return parseInt(ownerBalanceVal, 10);
  
}

export async function getUserNftMeta(address) {
  const provider = getGenericProvider();
  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  const tokenOwned = await Contract.tokenOfOwnerByIndex(address, 0);
  const tokenID = tokenOwned.toString();
  const metaURL = await Contract.tokenURI(tokenID);
  const fileHash = metaURL.split("ipfs://")[1];
  const fileCDN = `https://tomato-obliged-mink-573.mypinata.cloud/ipfs/${fileHash}`;
  const result = await getFileJson(fileCDN);
  return Object.assign({}, result, {tokenId: tokenID});
}

export async function getNLatestNftMedia(n) {
  const provider = getGenericProvider();
  const Contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);  
  const lastTokenId = await Contract.totalSupply();
  const lIdNumber = parseInt(lastTokenId.toString());
  let lowerBound = 0;
  if (lIdNumber > n) {
    lowerBound = lIdNumber - n;
  }
  const dataList = [];
  for (let i = lowerBound; i < lIdNumber; i++) {
    const metaResult = await Contract.tokenURI(i);
    const fileHash = metaResult.split("ipfs://")[1];
    const fileCDN = `https://tomato-obliged-mink-573.mypinata.cloud/ipfs/${fileHash}`;
    const result = await getFileJson(fileCDN);
    dataList.push(result);
  }
  return dataList;
}

async function getFileJson(fileHash) {
  const dataRes = await axios.get(fileHash);
  const metaJson = dataRes.data;
  const imageHash = metaJson.image.split("ipfs://")[1]; 
  const imageURI = `https://tomato-obliged-mink-573.mypinata.cloud/ipfs/${imageHash}`;
  return Object.assign({}, metaJson, {image: imageURI});
}


