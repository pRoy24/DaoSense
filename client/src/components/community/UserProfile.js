import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const NFT_CONTRACT_ADDRESS = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS;
export function UserProfile(props) {
  const {nftMeta, selectedAddress} = props;
  let nftAttibutes = <span />;
  if (nftMeta.attributes && nftMeta.attributes.length > 0) {
    nftAttibutes = 
      nftMeta.attributes.map(function(atItem, aKey){
        const key = atItem["attribute_name"];
        const value = atItem["attribute_value"];
        return <div key={"idx-" + aKey}>{`${key} : ${value}`}</div>
      })
    
  }
  return (
    <div>
      <div class="grid grid-cols-6 gap-0 mt-4">
        <div className='col-span-4'>
          <div className='text-center mt-2 mb-4'>
            <div className='text-lg inline-block'>
              {nftMeta.name} #{nftMeta.tokenId}
            </div>
            <div className='inline-block text-xs ml-4 underline cursor-pointer'>
              <a href={`https://testnets.opensea.io/assets/mumbai/${NFT_CONTRACT_ADDRESS}/${nftMeta.tokenId}`}
                target="_blank">
                  View on Opensea
              </a>
            </div>
          </div>
          <div className='flex flex-row'>
          <div className='w-4/5'>
            <img src={nftMeta.image} className="w-64 border-slate-500	border-2 m-auto shadow-md shadow-slate-900" />
          </div>
          <div className='w-3/5'>
          <div className='text-lg mt-2'>Description</div>
            <div className='mt-2 mb-2'>
            {nftMeta.description}
            </div>
            <div className='text-lg mt-2'>Attributes</div>
            <div>
              {nftAttibutes}
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-2'>
        <div className='text-lg text-center mt-2 mb-4'>
          DAO Emmissions
        </div>      
        <div className='text-left pl-12 '>
          <div>DAO Token</div>
        <div>DS Community Rewards Token (DSCT)</div>
        <div>
          Your pending emmissions 0 <button>Claim</button>
        </div>
        <div>
          Next Claim at 00:00:00 UTC
        </div>
        <div>
          <div>
            Current Emmissions 10 * Burns. 
          </div>
          <a hred="https://automation.chain.link/mumbai/56501103231743676822420610105274199741200786298291669815693147367877876317391"
          target="_blank">
            <button className='bg-slate-900 w-56 h-10 mt-4 rounded-xs'>
              View automation
              <FontAwesomeIcon icon={faLink} />
            </button>
          </a>
        </div>
    </div>
    </div>
  </div>
</div>
  )
}