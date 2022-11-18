import React from 'react';

export function UserProfile(props) {
  console.log(props);
  const {nftMeta} = props;
  return (
    <div>
      <div class="grid grid-cols-6 gap-0 mt-4">
        <div className='col-span-4'>
          <div className='text-center mt-2 mb-4'>
            <div className='text-lg inline-block'>
              {nftMeta.name} #{nftMeta.tokenId}
            </div>
            <div className='inline-block text-xs ml-4 underline cursor-pointer'>
              <a href={`https://testnets.opensea.io/assets/mumbai/0x6da4d69f6a6447b7f34bf0eeda393faa8dd43213/0`}
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
            {nftMeta.description}
          </div>
        </div>
      </div>
      <div className='col-span-2'>
        <div className='text-lg text-center mt-2 mb-4'>
          DAO Emmissions
        </div>      
        <div className='text-left pl-12 '>
        <div>DAO Token - DSCT</div>
        <div>
          Your pending emmissions
        </div>
        <div>
          Next Claim at
        </div>
        <div>
          Current Emmissions 500/day View automation
        </div>
    </div>
    </div>
  </div>
</div>
  )
}