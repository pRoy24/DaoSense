import React, { useState, useEffect, } from 'react';
import { TopNav } from '../nav/TopNav';
import { ethers } from "ethers";

import detectEthereumProvider from '@metamask/detect-provider';
import { MintDialog } from '../dialogs/MintDialog';
import { LandingPanaroma } from './LandingPanaroma';
import { mintDSPlot, getMintsForUser } from '../../utils/ERCUtils';
import './landing.scss';
import {
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from '../home/Home';
import TokenStation from '../community/TokenStation';
import WorkStation from '../community/WorkStation';
import BottomNav from '../nav/BottomNav';

var API_SERVER = process.env.REACT_APP_API_SERVER;

export function Landing() {
  const [ rulesDialogVisible, setRulesDialogVisible ] = useState(false);
  const [ mintDialogVisible, setMintDialogVisible ] = useState(false);
  const [ currentProvider, setCurrentProvider ] = useState(null);
  const [ selectedAddress, setSelectedAddress ] = useState('');
  const [ mintedPlots, setMintedPlots ] = useState([]);
  const [ userMints, setUserMints ] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState([]);
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
    mintDSPlot(selectedAddress).then(function(transactionReceipt) {
      //hideMintNFTDialog();
      //setNFTMinted(true);
      //history.push("/home");

    });

  }


  useEffect(() => {
    getMintsForUser(selectedAddress).then(function(userMints) {

      if (userMints > 0) {
      //  window.location.replace("/home");
      }
    });
  }, [selectedAddress]);  


  useEffect(() => {
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


  const hideRulesDialog = () => {
    setRulesDialogVisible(false); 
  }

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
  const { history } = useHistory();
  console.log(history);