import { COUPON_TYPES, WHITELISTED_CHAINS } from "../utils/chains";
const {
  keccak256,
  toBuffer,
  ecsign,
  bufferToHex,
} = require("ethereumjs-utils");
const { ethers } = require('ethers');

import axios from 'axios';

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

const API_KEY = '';

export async function checkAddressForWhitelist(address) {
  const result = WHITELISTED_CHAINS.map(function(chainId) {
    return getTransactionHistory(chainId, address).then(function(dateRes) {
      return dateRes;
    });
  });

  const dataResult = await Promise.all(result);
  const verifyWhitelist = getWhitelistVerification(dataResult);  
  return verifyWhitelist;
}


function getWhitelistVerification(dataResult) {
  Object.keys(dataResult).map(function(resultKey) {
    const dataResultItem = dataResult[resultKey];
    
  });
}

async function getTransactionHistory(chainId, address) {
  const headers = {
    "headers": {
      "X-API-Key": MORALIS_API_KEY
    }
  };

  const responseData = await axios.get(
    `https://deep-index.moralis.io/api/v2/${address}?chain=${chainId}`,
    headers
  );
  const response = responseData.data.result;
  let dataResponse = {};

  dataResponse[chainId] = response.result;
  return dataResponse;
} 

export async function getUserCoupon(chainKey, address) {
  const txHistory = await getTransactionHistory(chainKey, address);
  if (txHistory.length < 2) {
    return;
  }
  const DEPLOYER_PRIVATE_KEY = Buffer.from(process.env.DEPLOYER_PRIVATE_KEY, 'hex');
  const hashBuffer = generateHashBuffer(
    ["uint256", "address"],
    [COUPON_TYPES[chainKey], address]
  );
  const coupon = serializeCoupon(createCoupon(hashBuffer, DEPLOYER_PRIVATE_KEY));
  return coupon;
}

function createCoupon(hash, signerPvtKey) {
  return ecsign(hash, signerPvtKey);
}

function generateHashBuffer(typesArray, valueArray) {
  return keccak256(
    toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
    valueArray))
  );
}

function serializeCoupon(coupon) {
  return {
    r: bufferToHex(coupon.r),
    s: bufferToHex(coupon.s),
    v: coupon.v,
  };
}


