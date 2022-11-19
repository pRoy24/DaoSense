import React, { useState} from 'react';

export function UpcomingAutomations() {
  const [allowlistActionVisible, setAllowlistActionVisible] = useState(false);
  return (
    <div>
      <div className='text-lg mb-6 mt-4'>
        Vote on upcoming automations
      </div>
      <div className='w-full flex flex-row mb-10'>
        <div className='w-1/4'>
          Increase requirement for Allowlist by
        </div>
        <div>
          <button id="dropdownDefault" data-dropdown-toggle="dropdown" 
            class="text-white bg-slate-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() =>setAllowlistActionVisible(!allowlistActionVisible)}>
            1 <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {allowlistActionVisible ?
          <div id="dropdown" class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">3</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">4</a>
              </li>
            </ul>
          </div> : <span />}
        </div>
        <div>
        LINK if successive day delta increases by 1.
        </div> 
      </div>

        <div className='w-full flex flex-row mb-10'>
        <div className='w-1/4'>
          Decrease Maximum mints/day to 
        </div>
        <div className='mr-2'>
          <button id="dropdownDefault" data-dropdown-toggle="dropdown" 
            class="text-white bg-slate-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() =>setAllowlistActionVisible(!allowlistActionVisible)}>
            1 <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {allowlistActionVisible ?
          <div id="dropdown" class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">3</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">4</a>
              </li>
            </ul>
          </div> : <span />}
        </div>
        <div>
        if successive day delta increases by 10.
        </div> 
      </div>

      <div className='w-full flex flex-row'>
        <div className='w-1/4'>
        Set daily token emissions change to be
        </div>
        <div className='mr-2'>
          <button id="dropdownDefault" data-dropdown-toggle="dropdown" 
            class="text-white bg-slate-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() =>setAllowlistActionVisible(!allowlistActionVisible)}>
            10x <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {allowlistActionVisible ?
          <div id="dropdown" class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  1x
                </a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  2x
                </a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  5x
                </a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  0.5x
                </a>
              </li>
            </ul>
          </div> : <span />}
        </div>
        <div>
        of the daily token burns.
        </div> 
      </div>
      <div>
         <button className='disabled w-64 h-10 bg-slate-700 mt-6'>Submit Vote</button>
      </div>
    </div>
  )
}