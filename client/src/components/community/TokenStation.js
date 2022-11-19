import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { getUserNftMeta } from '../../utils/ERCUtils';
import { Route } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { DaoMetrics } from './DaoMetrics';
import { DiscussionBoard } from './DiscussionBoard';
import { UpcomingAutomations } from './UpcomingAutomations';

export default function TokenStation(props) {
  const {selectedAddress } = props;
  const activeTabClass = 'text-slate-100 bg-gray-100 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ';
  const inactiveTabClass = 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

  const [activeTab, setActiveTab] = useState({
    "profile": activeTabClass,
    "metrics": inactiveTabClass,
    "discussions": inactiveTabClass,
    "upcoming": inactiveTabClass
  });
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

  if (activeTab["profile"] === activeTabClass) {
    currentPageView = <UserProfile nftMeta={nftMeta} selectedAddress={selectedAddress}/>
  } else if (activeTab["metrics"] === activeTabClass) {
    currentPageView = <DaoMetrics />
  } else if (activeTab["discussions"] === activeTabClass) {
    currentPageView = <DiscussionBoard />
  } else if (activeTab["upcoming"] === activeTabClass) {
    currentPageView = <UpcomingAutomations/>
  }

  const toggleActiveTab = (tab) => {
    let prevActiveTab = Object.assign({}, activeTab);
    Object.keys(prevActiveTab).forEach(function(act) {
      prevActiveTab[act] = inactiveTabClass;
    });
    prevActiveTab[tab] = activeTabClass;
    setActiveTab(prevActiveTab);
  }
  return (
    <div className="text-white p-4 pl-10 text-left">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li class="mr-2" onClick={() => toggleActiveTab("profile")}>
          <div class={`inline-block p-4 rounded-t-lg w-52 cursor-pointer ${activeTab["profile"]}`}>
            Profile
          </div>
        </li>
        <li class="mr-2" onClick={() => toggleActiveTab("metrics")}> 
          <div class={`inline-block p-4 rounded-t-lg  w-52 cursor-pointer ${activeTab["metrics"]}`}>
          DAO Metrics
          </div>
    </li>
    <li class="mr-2" onClick={() => toggleActiveTab("discussions")}>
        <div class={`inline-block p-4 rounded-t-lg w-52 cursor-pointer ${activeTab["discussions"]}`}>
          Discussion Board
        </div>
    </li>
    <li class="mr-2" onClick={() => toggleActiveTab("upcoming")}>
      <div class={`inline-block p-4 rounded-t-lg w-52 cursor-pointer ${activeTab["upcoming"]}`}>
        Voting
      </div>
    </li>
  </ul>
  <div>
    {currentPageView} 
  </div>  
    </div>
  )
}