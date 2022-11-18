import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import './home.scss';

export default function Home(props) {
  const { userPortfolio } = props;
  console.log(userPortfolio);
  const plotTokenContract = process.env.REACT_APP_PLOT_CONTRACT_ADDRESS;
 let  plotToken;  
  if (userPortfolio) {
     plotToken = userPortfolio.find((item) => (item.token_address.toLowerCase() === plotTokenContract.toLowerCase()));
  }

  let plotMetadata;
  if (plotToken) {
    plotMetadata = JSON.parse(plotToken.metadata);
  }
  const plotImageURL = plotMetadata ? plotMetadata.image : 'https://sovereign-chains-images.s3.amazonaws.com/20.png';

  return (
    <div class="pt-4 pb-4 pl-6 pr-6">
      <div class="flex flex-row">
        <div class="basis-1/2">
          <img 
            src={plotImageURL}
            height="400" width="400" 
            class="m-auto nft-obj-img shadow-lg shadow-green-500/50 m-auto"/>
        </div>
        <div class="basis-1/2">
          <div class="mt-4 flex flex-col">
            <Link to="/">
            <button class="rounded-b-md  home-btn">
              Landing
            </button>
            </Link>
            <Link to="/workstation">
            <button class="rounded-b-md w-80  h-120 mt-4 home-btn">
              Workstation
            </button>
            </Link>
            <Link to="/community">
            <button class="rounded-b-md w-80 	h-120 mt-4 home-btn">
              Community
            </button>
            </Link>     
          </div>
      </div>
    </div>
  
  </div>
  )
}