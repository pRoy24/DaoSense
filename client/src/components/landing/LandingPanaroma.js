import React from 'react';
import { getChainById } from '../../utils/Constants';
import bnb from '../imgs/bnb.svg';
import { Link } from 'react-router-dom';
import ftm from '../imgs/ftm.svg';
import polygon from '../imgs/p3.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function LandingPanaroma(props) {
  const {mintedPlots,showMintDialog, userPortfolio} = props;
  const tokenAddress = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS ; 
  if (mintedPlots.length === 0) {
    return <span />;
  }
  const filteredPlots = mintedPlots.filter(function(item) {
    if (item.external_data) {
      return item;
    }
  });

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
        bg-gradient-to-r from-green-400
        to-blue-500 hover:from-pink-500 hover:to-yellow-500
        rounded-lg shadow-lg cursor-pointer
        text-white pl-10 w-3/5 m-auto pt-4 pb-4' onClick={showMintDialog}>
        <div>
          Check your ability to mint a plot to join one of the communities.
        </div>
        <div>
        <div class="grid grid-cols-3 gap-3 mt-4 mb-4">
          <div className='flex flex-row'>
            <div>
            <img src={bnb} className='w-10 h-10'/>
            </div>
            <div className='align-middle pl-2 pt-2'>
            BSC Islands
            </div>
          </div>
          <div className='flex flex-row'>
          <div> 
          <img src={polygon} className='w-10 h-10'/>
          </div> 
          <div className='align-middle pl-2 pt-2'>
          Polygon Islands
          </div>
          </div>

          <div className='flex flex-row'>
             <div>
          <img src={ftm} className='w-10 h-10'/>
          </div>
          <div className='align-middle pl-2 pt-2'>
          Fantom Islands 
          </div>
          </div>
          
          </div>
        </div>
        <div>
          Joining a community gives you access to daily token emissions and job marketplace.
        </div>
      </div>       
    )
  }
  return (
<div>
    {landingActionBtn}
  <div class="grid grid-cols-4 gap-4">
        
      {filteredPlots.map(function(item, idx) {
        const chain = getChainById(item.chain_id);
        if (!item.external_data) {
          return <span/>;
        }
        console.log(item);
        let marketplace = ``;
        let marketplaceLink = ``;
        console.log(item);
        if (item.chain_id === '250') {
          marketplace = 'Tofunft';
          marketplaceLink = `https://tofunft.com/nft/ftm/${tokenAddress}/${item.token_id}`;
        } else if (item.chain_id === '56') {
          marketplace = 'Nftrade';
          marketplaceLink = `https://nftrade.com/assets/bsc/${tokenAddress}/${item.token_id}`;
        } else if (item.chain_id === '137') {
          marketplace = 'Opensea';
          marketplaceLink = `https://opensea.io/assets/matic/${tokenAddress}/${item.token_id}`;
        }
        return (
          <div className="mt-4 p-4"> 
            <div className='relative'>
              <img src={item.external_data.image_512} className="nft-obj-img shadow-lg shadow-green-500/50 m-auto"/>
              <div className='absolute bottom-0 h-15 bg-neutral-800 w-full opacity-80 text-white pb-2'>
                <div>Minted on: {chain}</div>
                <a href={`${marketplaceLink}`} target="_blank">
                  View on {marketplace}&nbsp;
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}