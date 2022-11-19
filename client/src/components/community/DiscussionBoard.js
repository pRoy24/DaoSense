import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export function DiscussionBoard() {
  return (
    <div>
      <div class="grid grid-flow-row auto-rows-max">
      <div className='post-cell-row  mt-4 mb-6 w-3/5'>
        <div className='flex flex-row '>
        <div className='w-20 mr-4'>
          <div className='w-12 h-12 rounded-full bg-slate-800 '></div>
          <div className='text-xs text-center mt-1'>0xacd</div>
        </div>
        <div className=''>
          <div className='text-lg'>
          Increase the Allowlist delta to 5/day .
          </div>
          <div className='text-sm mb-2 mt-1 leading-6'>
            <p>There are a lot of people with much more than 1 LINK.
            I think the allowlist criteria should be at-least 1k LINK
            and would encourage the DAO to think in that direction.</p>
          </div>
          <div className='grid grid-cols-6 gap-1'>
            <div className=''>
              <div className='text-sm'>22/05/22</div>
              <div className='text-xs font-bold'>Created</div>
            </div>
            <div>
              <div className='text-sm'>22/05/22</div>
              <div className='text-xs font-bold'>Last Reply</div>
            </div>
            <div>
              <div className='text-sm'>14 users</div>
              <div className='text-xs font-bold'>Replies</div>
            </div>
            <div>
            <div className='text-sm'>2 <FontAwesomeIcon icon={faHeart} /></div>
             <div className='text-xs font-bold'>Likes</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className='post-cell-row  mt-4 mb-6 w-3/5'>
        <div className='flex flex-row '>
        <div className='w-20 mr-4'>
          <div className='w-12 h-12 rounded-full bg-slate-800 '></div>
          <div className='text-xs text-center mt-1'>0xacd</div>
        </div>
        <div className=''>
          <div className='text-lg'>
          Decrease the Maximum Mint delta to 10/day
          </div>
          <div className='text-sm mb-2 mt-1 leading-6'>
            <p>NFT inflation is a looming issue and although it is not a pressing concern now, each NFT will emit tokens potentially
              forever and this we neeed to take steps to control the inflation from the very start.</p>
          </div>
          <div className='grid grid-cols-6 gap-1'>
            <div className=''>
              <div className='text-sm'>23/05/22</div>
              <div className='text-xs font-bold'>Created</div>
            </div>
            <div>
              <div className='text-sm'>23/05/22</div>
              <div className='text-xs font-bold'>Last Reply</div>
            </div>
            <div>
              <div className='text-sm'>3 users</div>
              <div className='text-xs font-bold'>Replies</div>
            </div>
            <div>
            <div className='text-sm'>0 <FontAwesomeIcon icon={faHeart} /></div>
             <div className='text-xs font-bold'>Likes</div>
            </div>
          </div>
        </div>
        </div>
      </div>


      <div className='post-cell-row  mt-4 mb-6 w-3/5'>
        <div className='flex flex-row '>
        <div className='w-20 mr-4'>
          <div className='w-12 h-12 rounded-full bg-slate-800 '></div>
          <div className='text-xs text-center mt-1'>Roger</div>
        </div>
        <div className=''>
          <div className='text-lg'>
          Increase the Allowlist delta to 10/day .
          </div>
          <div className='text-sm mb-2 mt-1 leading-6'>
            <p>As I have said before, There are a lot of people with much more than 1 LINK.
            I think the allowlist criteria should be at-least 1k LINK
            and would encourage the DAO to think in that direction.</p>
          </div>
          <div className='grid grid-cols-6 gap-1'>
            <div className=''>
              <div className='text-sm'>15/05/22</div>
              <div className='text-xs font-bold'>Created</div>
            </div>
            <div>
              <div className='text-sm'>15/05/22</div>
              <div className='text-xs font-bold'>Last Reply</div>
            </div>
            <div>
              <div className='text-sm'>3 users</div>
              <div className='text-xs font-bold'>Replies</div>
            </div>
            <div>
            <div className='text-sm'>5 <FontAwesomeIcon icon={faHeart} /></div>
             <div className='text-xs font-bold'>Likes</div>
            </div>
          </div>
        </div>
        </div>
      </div>



    </div>
    </div>
  )
}