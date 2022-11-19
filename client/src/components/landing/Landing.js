import React, { useState, useEffect, } from 'react';
import { TopNav } from '../nav/TopNav';
import { ethers } from "ethers";

import detectEthereumProvider from '@metamask/detect-provider';
import { MintDialog } from '../dialogs/MintDialog';
import { LandingPanaroma } from './LandingPanaroma';
import { mintDSPlot, getMintsForUser, getNLatestNftMedia, getIsUserEligibleToMint } from '../../utils/ERCUtils';
import { getGenericWssProvider } from '../../utils/Provider';
import './landing.scss';
import {
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from '../home/Home';
import TokenStation from '../community/TokenStation';
import BottomNav from '../nav/BottomNav';

var API_SERVER = process.env.REACT_APP_API_SERVER;

export function Landing() {
  const [ mintDialogVisible, setMintDialogVisible ] = useState(false);
  const [ selectedAddress, setSelectedAddress ] = useState('');
  const [ latestNftMedia, setLatestNftMedia] = useState([]);
  const [ userMints, setUserMints ] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [userMintState, setUserMintState] = useState("init");
  const [ isWalletEligible, setIsWalletEligible ] = useState(false);

  const connectWallet = () => {
    async function connectInjectProvider() {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
    }
    connectInjectProvider();
  }

  const mintNFT = (chainSelection) => {
    setUserMintState("mint_init");    
    mintDSPlot(selectedAddress).then(function(transactionReceipt) {
      setUserMintState("mint_init");
    });
  }

  const listenToMintEvents = () => {
    const wssProvider = getGenericWssProvider();
    const filterMint = {
      address: process.env.REACT_APP_PLOT_CONTRACT_ADDRESS,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("MintUser(address,uint256)"),
          ethers.utils.hexZeroPad(selectedAddress, 32)
      ]
    }    
    wssProvider.on(filterMint, (data) => {
      setUserMintState("mint_complete");
    });
    const diceRollFilter  = {
      address: process.env.REACT_APP_PLOT_CONTRACT_ADDRESS,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("MintUser(address,uint256)"),
          ethers.utils.hexZeroPad(selectedAddress, 32)
      ]
    }
    wssProvider.on(diceRollFilter, (data) => {
      setUserMintState("dice_roll_init");
    });

    const mintCompleteFilter =  {
      address: process.env.REACT_APP_PLOT_CONTRACT_ADDRESS,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("MintUser(address,uint256)"),
          ethers.utils.hexZeroPad(selectedAddress, 32)
      ]
    };
    wssProvider.on(mintCompleteFilter, (data) => {
      console.log(data);
      setUserMintState("dice_roll_complete");
    });

    const plotRequestFilledFilter = {
      address: process.env.REACT_APP_PLOT_CONTRACT_ADDRESS,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("PlotRollRequestFulfilled(uint256,uint256[])"),
      ]
    }
    wssProvider.on(plotRequestFilledFilter, (data) => {
      console.log(data);
      setUserMintState("plot_request_complete");
      getMintsForUser(selectedAddress).then(function(userMints) {
        setUserMints(userMints);
      });     
    });    
  }

  useEffect(() => {
    if (selectedAddress) {
      getMintsForUser(selectedAddress).then(function(userMints) {
        setUserMints(userMints);
      });
      getIsUserEligibleToMint(selectedAddress).then(function(mintEligibleResponse) {
        setIsWalletEligible(mintEligibleResponse);
      })
      listenToMintEvents();
    }
  }, [selectedAddress]);  


  useEffect(() => {
    getNLatestNftMedia().then(function(latestNftMedia) {
      setLatestNftMedia(latestNftMedia);
    })
    async function onInit() {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setSelectedAddress(account);

      window.ethereum.on('accountsChanged', function (accounts) {

      });
      window.ethereum.on("chainChanged", (chainId) => {
        /* do what you want here */
        /* full refresh is recommended */
      });      
    }
    onInit();
  }, []);

  const hideMintNFTDialog = () => {
    setMintDialogVisible(false);
  }
  const showMintNFTDialog = () => {
    setMintDialogVisible(true);
  }

  const connectWeb3 = () => {
    async function onInit() {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setSelectedAddress(account);


      window.ethereum.on('accountsChanged', function (accounts) {
//        getWhitelistData(account);
      });
      window.ethereum.on("chainChanged", (chainId) => {
        /* do what you want here */
        /* full refresh is recommended */
      });      
    }
    onInit();    
  }

  let indexView = (
    <LandingPanaroma latestNftMedia={latestNftMedia} showMintDialog={showMintNFTDialog}
        userPortfolio={userPortfolio} userMints={userMints}/>    
  )
  if (userMints > 0) {
    indexView = <TokenStation selectedAddress={selectedAddress}/>
  }
  return (
      <div class="container m-auto">
          <TopNav showMintDialog={showMintNFTDialog} userMints={userMints}
          selectedAddress={selectedAddress} connectWeb3={connectWeb3}/>
          <MintDialog
            show={mintDialogVisible} mintNFT={mintNFT}
            hideDialog={hideMintNFTDialog} userMintState={userMintState}
            isWalletEligible={isWalletEligible}
            />
          <div class="container mx-auto landing-container min-h-screen m-auto mt-20 pb-20">
              <Route path="/home">
                <Home userPortfolio={userPortfolio} selectedAddress={selectedAddress}/>
              </Route>
              <Route path="/community">
                <TokenStation selectedAddress={selectedAddress}/>
              </Route>
              <Route exact path="/">
                {indexView}
              </Route>              
          </div>
        <BottomNav />
      </div>
    )
}