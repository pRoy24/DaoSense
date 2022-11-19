import React, { useEffect } from 'react';

import { getChainById } from '../../utils/Constants';
import linkIcon from '../../resources/link-logo.png';
import ipfs from '../../resources/ipfs-logo.svg'
import polygon from '../../resources/polygon_logo.png';
import quicknode from '../../resources/quicknode_logo.png';
import { Link, useHistory,  } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function LandingPanaroma(props) {
  const { history } = useHistory();

  const {latestNftMedia, showMintDialog, userPortfolio, } = props;
  const tokenAddress = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS ; 

  let lastMintImages = <span />;

  let landingActionBtn = <span />;
  if (userPortfolio && userPortfolio.length > 0) {
    landingActionBtn = (
      <Link to="/home">
        <button className='
          bg-gradient-to-r from-green-400
          to-blue-500 hover:from-pink-500 hover:to-yellow-500
          rounded-lg shadow-lg cursor-pointer
          text-white w-48 h-14 m-auto text-center align-center mt-6
          shadow-md'>
            Home
        </button>
      </Link>
    )
  } else {
    landingActionBtn = (
      <div className='
        bg-gradient-to-r hover:from-green-400
        hover:to-blue-500 from-pink-500 to-yellow-500
        rounded-lg shadow-lg cursor-pointer
        text-white pl-10 w-5/5 m-auto pt-4 pb-4 mb-5 m-4'>
        <div className='flex flex-row'> 
        <div className='text-left pl-2 w-3/5'>
          <div className='text-lg'>
            Your DAO on Steriods
          </div>
          <div>
            <p>Use Chainlink automations and VRF to automate and fine-tune onboarding,</p><p>token emmissions and community profile.</p>
          </div>
          <div className='text-lg mt-2'>
            Achieve Consensus easily
          </div>
          <div>
            <p>Use community voting to achieve consensus on delta parameters</p><p>and let Chainlink automation handle the rest.</p>
          </div>
          <div className='text-lg mt-2'>
            Cut through the noise
          </div>
          <div>
            <p>DAO decision making is slow to respond to rapidly evolving market situations.</p>
          </div>
          <div>
            <p>DaoSense utilizes combines verifiable on-chain automation</p><p> and manual DAO decision making to provide a comprehensive solution.</p>
          </div>
        </div>
        <div className='w-2/5'>
          <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
           dark:focus:ring-gray-700 dark:border-gray-700 w-64 align-middle mt-6 mr-4 h-18 cursor-pointer' 
          onClick={showMintDialog}>
            Mint
          </button>
          <div className='text-xs'>
            <p>Minting a plot gives you membership of the DAO</p><p>along with voting rights and rights to token emissions.</p>
          </div>
          <div >
            <div className='text-xs mt-4  p-2 '>
            Powered by <img src={linkIcon} className='h-6 inline mr-2'/>
            <img src={ipfs} className='h-6 inline mr-2'/>
            <img src={polygon} className='h-6 inline mr-2'/>
            <img src={quicknode} className='h-6 inline mr-2' />
            </div>
          </div>          
          </div>

        </div> 
      </div>       
    )
  }
  return (
<div>
    {landingActionBtn}
    <div>
      <div className='bg-gradient-to-r from-green-400
        to-blue-500 hover:from-pink-500 hover:to-yellow-500
        rounded-lg shadow-lg cursor-pointer
        text-white pl-10 w-5/5 m-auto pt-4 pb-4 m-4'>

        <div className='mb-4 text-center text-lg'>Latest Mints</div>
        <div className='grid grid-cols-4 gap-4'>
          {latestNftMedia.map(function(mintItem, mIdx) {
             return <img src={mintItem.image} className='w-64 border-slate-500	border-2 m-auto shadow-md shadow-slate-900' /> 
          })}
        </div> 
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      {lastMintImages}
    </div>
    </div>
  )
}