import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

export default function TokenStation() {
  const gotoHome = () => {
    console.log("HERE");
    //history.replace("/home");
  }  
  return (
    <div className="text-white p-4 pl-10 text-left">
        <div>DAO</div>

        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
    <li class="mr-2">
        <a href="#" aria-current="page" class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">
          Active Automations
          </a>
    </li>
    <li class="mr-2">
        <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
          Discussion Board
        </a>
    </li>
    <li class="mr-2">
        <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
          Upcoming Automations
        </a>
    </li>
</ul>

        <div>
          <div>
          Allowlist 
          </div>
          <div>
          Must hold 1 Link Token
          </div>
          <div>View Automation</div>
        </div>
        <div>
          Minting
          <div>
            Maximum 50 mints/day
          </div>
          <div>
            View automation.
          </div>
        </div>
        <div>
          <div>
            Emmissions/day
          </div>
          <div>
            (Total burns * 10)/day
          </div>
          <div>
            <a href="">View Automation</a>
          </div>
        </div>
    </div>
  )
}