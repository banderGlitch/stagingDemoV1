
import { ethers, JsonRpcProvider } from 'ethers'
import { useState, useEffect } from 'react'
import TypeAheadInput from './components/TypeAheadInput'
import ConnectButton from './utils/connectButton'
import { getERC20TransferEvents, getTokenBalances } from './getAllTokens.js'
import { useAccount, useBalance, usePublicClient, useWalletClient, useDisconnect } from 'wagmi';
import { tokensNetworks } from './constant'
import { BsCircleHalf } from "react-icons/bs"
import { FaLink, FaWallet, FaChartLine, FaCog } from 'react-icons/fa';
import { DropdownTheme } from './components/Design'
import { Dropdown } from './components/Common'
import Web3 from 'web3';
import './theme.css'

function App() {

  const { address, isConnected, connector, chain } = useAccount();
  const [accounts, setAccounts] = useState()
  const [balances, setBalances] = useState([]);
  const { data: balance } = useBalance({ address });
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { disconnect } = useDisconnect();
  const [networkBalances, setNetworkBalances] = useState({});
  const [allAccountBalances, setAllAccountBalances] = useState({});

  // Execute the getAccount function when the component is mounted


  // useEffect(() => {
  //   if (isConnected) {
  //     getAccount()
  //   }
  // }, [isConnected])

  const options = {
    startBlock: 5826000, // Starting block number
    endBlock: 'latest',   // Latest block or specific block number
    batchSize: 10000,      // Number of blocks to query at once
    maxRetries: 3,        // Maximum retry attempts for failed requests
    delayBetweenRetries: 1000 // Delay between retries in milliseconds
  };



  const getAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("accounts1------------------->", accounts)
      getAllBalances(accounts)
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const getAllBalances = async (accounts) => {
    let allAccountBalances = [];
    for (let i = 0; i < accounts.length; i++) {
      console.log("accounts2------------------->", accounts[i])

      allAccountBalances[i] = [];
      for (let j = 0; j < tokensNetworks.length; j++) {
        const tokens = await getERC20TransferEvents(accounts[i], tokensNetworks[j].rpc, options)
        const provider = new JsonRpcProvider(tokensNetworks[j].rpc);
        const nativeBalance = await provider.getBalance(accounts[i]);
        if (tokens.length > 0 || nativeBalance > 0) {
          const tokenAddresses = tokens.map(token => token.tokenAddress)
          console.log("tokenAddresses------------------->", tokenAddresses)
          const tokenBalances = await getTokenBalances(accounts[i], tokenAddresses, tokensNetworks[j].rpc)
          allAccountBalances[i][j] = {
            account: accounts[i],
            network: tokensNetworks[j].name,
            nativeBalances: nativeBalance,
            balances: tokenBalances,
          }
        }
      }
    }
    setAllAccountBalances(allAccountBalances)
  }

  //Theme 


  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('chains');
  const [activeMainTab, setActiveMainTab] = useState('intent');
  const themeOptions = ['light', 'dark', 'custom'];

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chains':
        return <ChainsTab />;
      case 'wallet':
        return <WalletTab allAccountBalances={allAccountBalances} />;
      case 'defi':
        return <DefiTab />;
      case 'actions':
        return <ActionsTab />;
      default:
        return <ChainsTab />;
    }
  };


  const renderMainTabContent = () => {
    switch (activeMainTab) {
      case 'intent':
        return <IntentTab />;
      case 'history':
        return <HistoryTab />;
      default:
        return <IntentTab />;
    }
  };


  useEffect(() => {
    console.log("allAccountBalances------------------->", allAccountBalances)
  }, [allAccountBalances])







  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className='w-full p-3'>
        <div className='flex justify-between'>
          <p>header</p>
          <Dropdown
            className='bg-black'
            options={themeOptions}
            value={theme}
            onChange={handleThemeChange}
          />
        </div>
      </header>
      <main className='flex-1 overflow-hidden'>
        <div className={`flex flex-col md:flex-row h-full  ${theme}`}>
          <div className="w-full md:w-1/4 p-4 bg-sidebar text-sidebar-text overflow-y-auto ">
            {/* Tab Navigation */}

            <div className="flex justify-center mb-3">
              {['chains', 'wallet', 'defi', 'actions'].map((tab) => (
                <button
                  key={tab}
                  className={`mx-2 text-sm font-medium
                    ${activeTab === tab
                      ? 'text-button border-b-2 border-button'
                      : 'text-main-text hover:text-button'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="overflow-y-auto h-[calc(100%-40px)]">
              {isConnected || activeTab === 'actions' ? renderTabContent() : <ConnectButton />}
            </div>
          </div>
          <div className="w-full md:w-3/4 p-4 bg-main text-main-text overflow-y-auto">
            {/* Add your main content here */}
            <div className="flex justify-center">
              {['intent', 'history'].map((tab) => (
                <button
                  key={tab}
                  className={`mx-4 py-2 px-1 text-sm font-medium transition-all duration-200 ease-in-out
                    ${activeMainTab === tab
                      ? 'text-button border-b-2 border-button'
                      : 'text-main-text hover:text-button'}`}
                  onClick={() => setActiveMainTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Main Tab Content */}
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {renderMainTabContent()}
            </div>
          </div>
        </div>
      </main>
      <footer className='w-full text-center p-2'>
        footer
      </footer>
    </div>

  )
}

export default App

// Main Tab Content
const IntentTab = () => {
  return (
    <div>
      <h2 className="text-xl text-center font-bold mt-10">What do you want to do?</h2>
      <TypeAheadInput />
      {/* Add intent-related content here */}
    </div>
  );
};


const HistoryTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">History</h2>
      {/* Add history-related content here */}
    </div>
  );
};


// Tab Content

const ChainsTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Supported Chains</h3>
      <div className='flex flex-wrap'>
        {tokensNetworks.map((token) => (
          <div key={token.name}>{token.name}</div>
        ))}
      </div>
    </div>
  );
};



const WalletTab = ({ allAccountBalances }) => {
  // console.log("allAccountBalances------------------->", allAccountBalances) 
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Wallet Balances</h3>
      {/* {console.log("allAccountBalancesinside------------------->",allAccountBalances[0])}
      <p>{allAccountBalances[0]?.network}</p>
      {allAccountBalances && allAccountBalances?.map((account) => (
        account?.map((account) => (
          <p>{account.account}</p>
        ))
      ))} */}
      {/* Add wallet-related content here */}
    </div>
  );
};



const DefiTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">DeFi</h3>
      {/* Add DeFi-related content here */}
    </div>
  );
};



const ActionsTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Actions</h3>
      {/* Add actions-related content here */}
    </div>
  );
};




















// const tabs = [
//   { id: 'chains', icon: FaLink, label: 'Chains' },
//   { id: 'wallet', icon: FaWallet, label: 'Wallet' },
//   { id: 'defi', icon: FaChartLine, label: 'DeFi' },
//   { id: 'actions', icon: FaCog, label: 'Actions' },
// ];





// extra code 

{/* <div className="flex justify-around mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`p-2 rounded-full transition-colors duration-200 ease-in-out
                  ${activeTab === tab.id
                      ? 'bg-button text-button-text'
                      : 'bg-sidebar text-sidebar-text hover:bg-opacity-75'}`}
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                >
                  <tab.icon className="w-6 h-6" />
                </button>
              ))}
            </div> */}