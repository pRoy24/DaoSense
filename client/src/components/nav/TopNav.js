import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

export function TopNav(props) {
  const {showMintDialog, currentChain, nftMinted,
    selectedAddress, connectWeb3 } = props;
  const history = useHistory();
  const gotoHome = () => {
    history.replace("/");
  }
  useEffect(() => {
    if (nftMinted) {
      history.replace("/");
    }
  }, [nftMinted]);
  let addressString = '';
  let connectionString = '';
  if (selectedAddress && selectedAddress.length > 0) {
    addressString = `Connected to 0x...${selectedAddress.slice(selectedAddress.length - 8, selectedAddress.length )}`;
  } else {
    addressString = <button onClick={connectWeb3}>Connect</button>  
  }
  let windowEth = window.ethereum;
  let networkVersion;
  if (windowEth) {
   networkVersion = window.ethereum.networkVersion;
  }

  if (networkVersion) {
    if (networkVersion === '80001') {
      connectionString = <div className='flex flex-row text-green-200 pt-2.5 font-semibold ml-4'>
      <div>
        Connected to Mumbai network 
      </div>
      <div className='ml-1 pt-0.5 font-bold'>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      </div>     
    }
    else if (networkVersion === '5') {
      connectionString = <div className='flex flex-row text-green-200 pt-3 font-semibold  ml-4'>
        Connected to Goerli test network 
        <div className='ml-1 pt-0.5 font-bold'>
        <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>      
    } else if (networkVersion === '137') {
      connectionString = <div className='flex flex-row text-green-200 pt-3 font-semibold  ml-4'>
        Connected to polygon network 
        <div className='ml-1 pt-0.5 font-bold'>
        <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    } else if (networkVersion === '56') {
      connectionString = <div className='flex flex-row text-green-200 pt-2.5 font-semibold  ml-4'>
        <div>
        Connected to BSC network
        </div>
        <div className='ml-1 pt-0.5 font-bold'> 
          <FontAwesomeIcon icon={faCheck} />
        </div> 
        </div>
    } else if (networkVersion === '256') {
      connectionString = <div className='flex flex-row text-green-200 pt-2.5 font-semibold  ml-4'>
        <div>
          Connected to Fantom network 
        </div>
        <div className='ml-1 pt-0.5 font-bold'>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        </div>
    } else {
      connectionString = <div className='flex flex-row text-red-500 pt-2.5 font-semibold  ml-4'>
        <div>
          Unsupported network:  Please switch to Polygon Mumbai testnet to mint.
        </div>
        <div className='ml-1 pt-0.5 font-bold'>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    }

  }
  return (
    <div class="container mx-auto ">
      <div className='top-nav-container rounded-b-lg bg-emerald-900'>
      <div class="flex h-full">
        <div class="flex-none w-80 h-14 pt-2 font-['Open_Sans'] text-neutral-50 font-bold text-2xl cursor-pointer" onClick={gotoHome}>
          DaoSense
        </div>
        <div class="grow h-14">
          {connectionString}
        </div>
        <div class="flex-none w-200 h-10 pr-10 pt-3 text-base text-neutral-50 font-medium">

        </div>

        <div class="flex-none w-200 h-10 pr-10 pt-3 text-base text-neutral-50 font-medium">
          {addressString}
        </div>
      </div>  
      </div>
    </div>
  )
}