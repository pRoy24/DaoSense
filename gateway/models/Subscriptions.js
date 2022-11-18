import { ethers } from 'ethers';
import chainlinkContractAbi from '../contracts/SCVRFConsumer.json';
import { getProviderByChainId, getWssProviderByChainId  } from '../utils/chains';

function listenToVRFGenerationEvents() {
  const provider = getWssProviderByChainId('goerli');
  const ChainLinkVrfDeployedAddress = process.env.VRF_CONTRACT_ADDRESS;

  const filter = {
    address: ChainLinkVrfDeployedAddress,
    topics: [
        // the name of the event, parnetheses containing the data type of each event, no spaces
        ethers.utils.id("PlotRollRequestFulfilled(uint256,uint256)")
    ]
  };

  provider.on(filter, (data) => {
    console.log(data);
    getLatestRandomData();
    // do whatever you want here
    // I'm pretty sure this returns a promise, so don't forget to resolve it
  })
}

async function getLatestRandomData() {
  const ChainLinkVrfDeployedAddress = process.env.VRF_CONTRACT_ADDRESS;
  const jsonProvider = getProviderByChainId('goerli');
  const ChainlinkVrfContract = new ethers.Contract(ChainLinkVrfDeployedAddress, chainlinkContractAbi, jsonProvider);
  const lastRequestId = await ChainlinkVrfContract.lastRequestId();
  const reqIdStr = lastRequestId.toString();
  const randomWordData = await ChainlinkVrfContract.getRequestStatus(reqIdStr);
  const randomWords = randomWordData.randomWords;
  const randomWordString = randomWords.map(function(rw) {
    console.log(rw.toString());
    return rw.toString();
  }); 
  return randomWordString;
}

function decodeData(logData) {

}


getLatestRandomData();

decodeData('0xdc2e6465eab15e25a9e15a69b512b8cddd6b05283d2b3348292613383888482200000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000002b2e769b3f58f09a00000000000000000000000000000000000000000000000000000000000000028dcd5e7681eb943bdd8dffd2662a4ff78e04cd2fd4d1c25ccb7848a6d6fccda11149cbdb56641ef4dc9ef45d4e0ab1036a104ed4cf6997dca4b1121b6c185a5d');

listenToVRFGenerationEvents();