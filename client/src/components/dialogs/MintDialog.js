import React, { useEffect, useState } from 'react';
import plain from '../imgs/plain.png';
import river from '../imgs/river.png';
import mountain from '../imgs/mountain.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'



export function MintDialog(props) {
  const { mintNFT, hideDialog, show, mintedPlots, getPlotLottery, userMintState, isWalletEligible } = props;
  const [selectedChain, setSelectedChain ] = useState('goerli');
  const sendMintNftRequest = () => {
    mintNFT(selectedChain);
  }

  useEffect(() => {
    if (userMintState === 'plot_request_complete') {
      hideDialog();
    }
  }, [userMintState]);
  const rollPlotLotteryRequest = () => {
    // hideDialog();
    mintNFT(selectedChain);
  }
  let dialogVisibled = `z-10 block`;
  if (show === false) {
    dialogVisibled = `z-0 hidden`;
  }
  let dialogContent = (
    <div>
      <h3 class="relative text-lg font-medium leading-6 text-neutral-100 pb-4" id="modal-title">
        Check your eligibility -
        <FontAwesomeIcon className='right-0 absolute mt-1 mr-2' icon={faTimes} onClick={hideDialog}/>
      </h3>
      <div class="flex flex-row">
      <div>
        <div>You must hold 1 Mumbai LINK token in your wallet to be eligible</div>
        <div>Probability of mints-</div>
        <div className='flex flex-row'>
          <div className='m-2'>
            <div className='relative'>
              <img src={plain} />
              <div className='absolute bottom-0 h-6 w-full bg-slate-900 opacity-70 text-center pb-4'>5 variants</div>
            </div>
            <div className='text-sm mt-2'>70% Plain-side</div>
          </div>
          <div className='m-2'>
            <div className='relative'>
              <img src={river} />
              <div className='absolute bottom-0 h-6 w-full bg-slate-900 opacity-70 text-center pb-4'>5 variants</div>
            </div>
            <div className='text-sm mt-2'>20% River-side</div>             
          </div>
          <div className='m-2'>
            <div className='relative'>
              <img src={mountain} />
              <div className='absolute bottom-0 h-6 w-full bg-slate-900 opacity-70 text-center pb-4'>5 variants</div>
            </div>
            <div className='text-sm mt-2'>10% Mountain-side</div>
          </div>
        </div>
        <div>Random draw secured by Chainlink VRF</div>
      </div>
      </div>
      <div class="bg-stone-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button"
          class="mt-3 inline-flex w-full justify-center
          rounded-md border border-white-300 bg-white-800 px-4 py-2
          text-base font-medium text-white-700 shadow-sm hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={rollPlotLotteryRequest}>Roll Plot Lottery</button>
      </div>
    </div>    
  )

  if (userMintState !== 'init') {
    let currentStep = "";
    if (userMintState === 'mint_complete') {
      currentStep = <div>
        <div>Completed Step 1/4</div>
        <div>Reserved your token ID on the blockchain</div>
      </div>
    }
    if (userMintState === 'dice_roll_init') {
      currentStep = <div>
      <div>Completed Step 2/4</div>
      <div>Requesting random dice roll from Chainlink VRF</div>
    </div>    
    }
    if (userMintState === 'dice_roll_complete') {
      currentStep = <div>
      <div>Completed Step 3/4</div>
      <div>Receieved VRF value. Allocating random plot.</div>
    </div>     
    }
    if (userMintState === 'plot_request_complete') {
      currentStep = <div>
      <div>Completed Step 4/4</div>
      <div>Mint Complete. Retreieing NFT values</div>
    </div>      
    }
    dialogContent = (
      <div className='h-60'>
      <h3 class="relative text-lg font-medium leading-6 text-neutral-100 pb-4 text-center" id="modal-title">
        Waiting for your NFT to mint.
        <FontAwesomeIcon className='right-0 absolute mt-1 mr-2' icon={faTimes} onClick={hideDialog}/>
      </h3>
      <div class="flex flex-row">
      <div className='text-center'>
        <div>
          Your NFT is being minted. <FontAwesomeIcon icon={faSpinner} spin />
        </div>
        {currentStep}
      </div>
      </div>
      </div>
    )
  }

    return (
      
    <div class={`relative ${dialogVisibled}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden
    rounded-lg bg-stone-800 text-left text-white shadow-xl transition-all
      sm:my-8 sm:w-full sm:max-w-lg pl-4 pr-4 pt-2 pb-2">
          {dialogContent}
        </div>  
        </div>
      </div>
    </div>
    )

}

