import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

export default function Workstation() {
  const history = useHistory();

  const workspaceJobList = [
    {
      title: 'Backend Solidity developer needed.',
      poster: 'jeremi123',
      description: 'Need a solidity developer to create arbitrage trading between Polygon and Fantom',
      pay: '40',
      unit: 'hourly'
    },
    {
      title: 'Frontend developer.',
      poster: 'jeremi123',
      description: 'Need a ReactJS developer to create webUI for trading widget.',
      pay: '60',
      unit: 'hourly'
    },
    {
      title: 'web3 javascript developer',
      poster: 'samgam',
      description: 'Need a web3 javascript developer to develop EthersJS integrations for DEX',
      pay: '55',
      unit: 'hourly'
    },
    {
      title: 'Backend Solidity developer.',
      poster: 'jeremi123',
      description: 'Need a solidity developer to create arbitrage trading between Polygon and Fantom',
      pay: '40',
      unit: 'hourly'
    },          
  ];
  const gotoHome = () => {
    console.log("HERE");
    //history.replace("/home");
  }
  return (
    <div classNameName="pt-4 pb-4 pl-8 pr-8 ml-4 mr-4">
      <div className="clear mt-4 flex flex-wrap mb-4"></div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
 
        <li className="mr-2">
          <a href="#" className="inline-block py-3 px-4 text-white rounded-lg page-tab-active active"
            aria-current="page">
            Development
          </a>
        </li>
        <li className="mr-2">
          <a href="#"  className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
            Artists
          </a>
        </li>
        <li className="mr-2">
          <a href="#" className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
            AI / Prompt Engineering
          </a>
        </li>
        <li className="mr-2">
          <a href="#" className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
            AI / Data Tagging
          </a>
        </li>
        <li>
          <a className="inline-block py-3 px-4 text-gray-400 cursor-not-allowed dark:text-gray-500">
            Content Writing
          </a>
        </li>
      </ul>
      <div>
        {workspaceJobList.map(function(wjItem, key) {
          return <WorkspaceRow job={wjItem} key={`ws-row-${key}`}/>
        })}
        <ul>
          <li>
            <WorkspaceRow />
          </li>
        </ul>
      </div>
</div>
  )
}

function WorkspaceRow(props) {
  const { job }= props;

  if (!job) {
    return <span />;
  }
  return (
    <div className="flex flex-row workspace-row mt-4 mr-4 ml-4 pr-4 pl-4 pt-4">
      <div className="basis-1/2 text-left">
        <div>{job.title}</div>
        <div className="text-xs">{job.description}</div>
      </div>
      <div className="basis-1/4">
      <div className="flex flex-wrap">
      <div className="icon-avatar">       
      </div>
      <div className="text-left ml-2">
        <div>
        {job.poster}
        </div>
        <div className="text-xs">
        Posted by
        </div>        
      </div>
      </div>
    </div> 
    <div className="basis-1/4 text-right">
      <div>
        {job.pay} BSEM/Hr
      </div>
      <div className="text-xs">
        Proposed Pay
      </div>
    </div>
  </div>
  )
}

