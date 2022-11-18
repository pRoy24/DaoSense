import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { getUserNftMeta } from '../../utils/ERCUtils';
import { Route } from 'react-router-dom';
import { UserProfile } from './UserProfile';

export default function TokenStation(props) {
  const {selectedAddress } = props;
  const [activeTab, setActiveTab] = useState('profile');
  const [nftMeta, setNftMeta] = useState({});
  const gotoHome = () => {

    //history.replace("/home");
  }  

  useEffect(() => {
    getUserNftMeta(selectedAddress).then(function(userNftMetaResponse) {
      setNftMeta(userNftMetaResponse);
    });
  }, []);
  let currentPageView = <span />;

  if (activeTab === 'profile') {
    currentPageView = <UserProfile nftMeta={nftMeta}/>
  }
  return (
    <div className="text-white p-4 pl-10 text-left">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li class="mr-2" onClick={() => setActiveTab("profile")}>
          <div class="inline-block p-4 text-slate-100 bg-gray-100 rounded-t-lg active
          bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 
          w-52 cursor-pointer">
            Profile
          </div>
        </li>
        <li class="mr-2">
          <div class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 w-52">
          DAO Metrics
          </div>
    </li>
    <li class="mr-2">
        <div class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 w-52">
          Discussion Board
        </div>
    </li>
    <li class="mr-2">
      <div class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 w-52">
        Upcoming Automations
      </div>
    </li>
  </ul>
  <div>
    {currentPageView} 
  </div>  
    </div>
  )
}