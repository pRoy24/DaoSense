import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import e from "express";
import { getProviderByChainId, NETWORK_IDS } from "../utils/chains";

const { ethers } = require('ethers');
var contractAbi = require('../contracts/SCCommunityPlot.json');
var chainlinkContractAbi = require('../contracts/SCVRFConsumer.json');
const CONTRACT_ADDRESS = process.env.PLOT_CONTRACT_ADDRESS;

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

export async function uploadMetaForNextId(chain) {
  const nextId = await getNextId(); 
  const uploadMeta = await setMeta(chain, nextId);
}

async function getNextId() {
  const provider = getProviderByChainId('polygon');
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);
  const id = await contract.totalSupply();

  const idStr = id.toString();
  return parseInt(idStr) + 1;
}

export async function setMeta(chain, nextId) {
  const imgID = nextId % 43;
  const imgURL = `https://sovereign-chains-images.s3.amazonaws.com/${imgID}.png`;
  const metaPayload = {
    "description": "Sovereign Chains Plot. Built for Demo purposes only.", 
    "external_url": "https://github.com/pRoy24/SovereignChains", 
    "image": imgURL, 
    "name": "Sovereign Chains Land Plot",
    "attributes": [
      {
        "attribute_type": "chain",
        "attibute_value": chain,
      },   
    ]
  };

  var buf = Buffer.from(JSON.stringify(metaPayload));

  var data = {
      Bucket: 'sovereign-chains-meta',
      Key: nextId.toString(),
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'application/json',
      ACL: 'public-read'
  };

  
  // a client can be shared by different commands.
  const awsClient = new S3Client({
    region: "us-east-1",
    credentials: {
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY
  }});

  const rd = await awsClient.send(new PutObjectCommand(data));

}

// Function gets Meta via Covalent API
export async function getMetadataForContract() {
  const contractAddress = process.env.PLOT_CONTRACT_ADDRESS;

  const covalentApiKey = process.env.COVALENT_API_KEY;
  
  const nftIdList = NETWORK_IDS.map(function(networkId) {
    const request = `https://api.covalenthq.com/v1/${networkId}/tokens/${contractAddress}/nft_token_ids/?&key=${covalentApiKey}`;
    return axios.get(request).then(function(dataRes) {
      const nftItems = dataRes.data.data.items;
      let dataObject = { };
      dataObject[networkId] = nftItems;
        return dataObject;
      }) 
    });

  const dRes = await Promise.all(nftIdList);
   console.log(dRes);

  const dataMetaPromise = dRes.map(function(dResItem) {
    const chainId = Object.keys(dResItem)[0];
    const mintedItems = dResItem[chainId];
    const mintMetadata = mintedItems.map(function(mi) {
      const metaRequest = `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${mi.token_id}/?key=${covalentApiKey}`;
      console.log(metaRequest);
      return axios.get(metaRequest).then(function(dataListResponse) {
        const metaRes = dataListResponse.data.data.items[0].nft_data;
        if (metaRes && metaRes.length > 0) {
          return metaRes[0];
        } else {
          return null;
        }
      }).catch(function(err){
        return null;
      });
    });
    return Promise.all(mintMetadata).then(function(dRes) {
      let dataObj = {};
      dataObj[chainId] = dRes;
      return dataObj;
    });
  });
  const dataMetaResponse = await Promise.all(dataMetaPromise);
  let responseItem = [];
  dataMetaResponse.forEach(function(dmi) {
    const chainId = Object.keys(dmi)[0];
    const nftList = dmi[chainId];
    if (nftList && nftList.length > 0) {
      nftList.forEach(function(nfi) {
        const payload = Object.assign({}, {chain_id: chainId}, nfi);
        responseItem.push(payload);
      }); 
    }
  });
  return responseItem;
}


export async function getNFTsByWallet(address) {
  const chains = ['bsc', 'polygon', 'fantom'];
  const headers = {'headers': {
    "X-API-Key": process.env.MORALIS_API_KEY
  }}
  const chainNFTList = chains.map(function(chain){
    return axios.get(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chain}&format=decimal&normalizeMetadata=false`, headers).then(function(dataResponse) {
      const nftList = dataResponse.data;
      return nftList.result;
    });
  });
  const dataRes = await Promise.all(chainNFTList);
  let normalizedPayload = [];
  dataRes.forEach(function(frm1) {
    normalizedPayload = normalizedPayload.concat(frm1);
  });
  return normalizedPayload;
}

export async function updateTokenState() {
  const tokenId = await getLastTokenState();

  const awsClient = new S3Client({
    region: "us-east-1",
    credentials: {
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY
  }});

  const newTokenId = parseInt(tokenId) + 1;
  const newData = {
    Bucket: 'sovereign-chains-meta',
    Key: "token_state",
    Body: newTokenId.toString(),
    ContentEncoding: 'base64',
    ACL: 'public-read'
  }
  const wr = await awsClient.send(new PutObjectCommand(newData));
  console.log(wr);
}

export async function getTokenState() {
  return await getLastTokenState();
}

async function getLastTokenState() {
  const awsClient = new S3Client({
    region: "us-east-1",
    credentials: {
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY
  }});

  const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

  var data = {
    Bucket: 'sovereign-chains-meta',
    Key: "token_state"
};

  const { Body }  = await awsClient.send(new GetObjectCommand(data));

  const bodyContents = await streamToString(Body);
  console.log(bodyContents);
  
  return bodyContents; 
}

export async function getDiceRoll() {
  const provider = getProviderByChainId('goerli');
  const ChainLinkVrfDeployedAddress = process.env.VRF_CONTRACT_ADDRESS;
  let wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY);
  wallet = wallet.connect(provider);
  const ChainlinkContract = new ethers.Contract(ChainLinkVrfDeployedAddress, chainlinkContractAbi, wallet);
  const resData = await ChainlinkContract.functions.requestPlotRoll(
    {
      gasLimit: '400000'
    });
  console.log(resData);  
  
}