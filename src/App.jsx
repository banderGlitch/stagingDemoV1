
import { ethers, JsonRpcProvider } from 'ethers'
import { useState, useEffect } from 'react'
import TypeAheadInput from './components/TypeAheadInput'
import ConnectButton from './utils/connectButton'
import { getERC20TransferEvents, getTokenBalances } from './getAllTokens.js'
import { useAccount, useBalance, usePublicClient, useWalletClient, useDisconnect } from 'wagmi';
import { tokensNetworks } from './constant'
import { IoLogOutOutline } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import { BsCircleHalf } from "react-icons/bs"
import { IoIosRefresh } from "react-icons/io";
import { FaLink, FaWallet, FaChartLine, FaCog, FaCopy, FaChevronDown, FaChevronUp, FaChevronRight, FaCheck, FaDotCircle } from 'react-icons/fa';

import { VscCollapseAll } from "react-icons/vsc";
import { Dropdown } from './components/commonComp'
import Web3 from 'web3';
import './theme.css'
import { FaSpinner } from 'react-icons/fa';
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


  useEffect(() => {
    if (isConnected) {
      getAccount()
    }
  }, [isConnected])


  const options = {
    startBlock: 5726000, // Starting block number
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
            chainId: tokensNetworks[j].chainId,
            symbol: tokensNetworks[j].currencySymbol,
            network: tokensNetworks[j].name,
            nativeBalances: nativeBalance,
            balances: tokenBalances,
          }
        }
      }
    }
    setAllAccountBalances(allAccountBalances)
  }



  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('chains');
  const [activeMainTab, setActiveMainTab] = useState('intent');
  const themeOptions = ['light', 'dark', 'custom'];
  // comment
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chains':
        return <ChainsTab />;
      case 'wallet':
        return <WalletTab allAccountBalances={allAccountBalances} tokensNetworks={tokensNetworks} />;
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
          <div className='flex items-center gap-4'>
            {isConnected && <IoLogOutOutline size={20} onClick={disconnect} />}
            <Dropdown
              className='bg-black'
              options={themeOptions}
              value={theme}
              onChange={handleThemeChange}
            />
          </div>
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
            <div className="flex justify-between items-center w-full">
              <div className="flex-shrink-0">
                <Connect theme={theme} />
              </div>
              <div className="flex justify-center flex-grow">
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
              <div className="flex-shrink-0 w-[100px]"></div> {/* Spacer to balance the layout */}
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
const IntentTab = ({ theme }) => {
  return (
    <div>
      <h2 className="text-xl text-center font-bold mt-10">What do you want to do?</h2>
      <TypeAheadInput theme={theme} />
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
  const [isLoading, setIsLoading] = useState(true);
  const [formattedBalances, setFormattedBalances] = useState([]);
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [expandedNetworks, setExpandedNetworks] = useState({});
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const { address: connectedAddress } = useAccount()


  useEffect(() => {
    if (allAccountBalances && allAccountBalances.length > 0) {
      const formatted = allAccountBalances.reduce((acc, accountArray) => {
        accountArray.forEach(account => {
          if (!acc[account.account]) {
            acc[account.account] = [];
          }
          acc[account.account].push({
            network: account.network,
            chainId: account.chainId,
            symbol: account.symbol,
            nativeBalance: ethers.formatEther(account.nativeBalances),
            tokens: account.balances.map(token => ({
              symbol: token.symbol,
              balance: token.balance
            }))
          });
        });
        return acc;
      }, {});
      setFormattedBalances(formatted);
      setIsLoading(false);
    }
  }, [allAccountBalances]);



  const toggleAddressExpansion = (address) => {
    setExpandedAddresses(prev => ({
      ...prev,
      [address]: !prev[address]
    }));
  };

  const toggleNetworkExpansion = (address, networkIndex) => {
    setExpandedNetworks(prev => ({
      ...prev,
      [`${address}-${networkIndex}`]: !prev[`${address}-${networkIndex}`]
    }));
  };

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    });
  };

  // const collapseAll = () => {
  //   setExpandedAddresses({});
  //   setExpandedNetworks({});
  // };

  const formatAddress = (address) => {
    if (address.length <= 8) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };



  // const toggleAllExpansion = () => {
  //   if (Object.keys(expandedAddresses).length === 0 && Object.keys(expandedNetworks).length === 0) {
  //     // Expand all
  //     const allAddressesExpanded = Object.keys(formattedBalances).reduce((acc, address) => {
  //       acc[address] = true;
  //       return acc;
  //     }, {});
  //     setExpandedAddresses(allAddressesExpanded);

  //     const allNetworksExpanded = Object.entries(formattedBalances).reduce((acc, [address, networks]) => {
  //       networks.forEach((_, index) => {
  //         acc[`${address}-${index}`] = true;
  //       });
  //       return acc;
  //     }, {});
  //     setExpandedNetworks(allNetworksExpanded);
  //   } else {
  //     // Collapse all
  //     setExpandedAddresses({});
  //     setExpandedNetworks({});
  //   }
  // };


  const toggleAllExpansion = () => {
    setIsAllExpanded(!isAllExpanded);

    if (!isAllExpanded) {
      // Expand all
      const allExpanded = Object.keys(formattedBalances).reduce((acc, address) => {
        acc[address] = true;
        return acc;
      }, {});
      setExpandedAddresses(allExpanded);
    } else {
      // Collapse all
      setExpandedAddresses({});
    }
  };

  const refreshBalances = async () => {
    // await getAccount()
  }




  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-button" />
      </div>
    );
  }



  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <VscCollapseAll size={15} onClick={toggleAllExpansion} />
        <IoIosRefresh size={13} onClick={refreshBalances} />
      </div>
      {Object.entries(formattedBalances).map(([account, networks]) => (
        <div key={account} className="mb-4 p-2 bg-sidebar-alt rounded-lg">
          <div className='flex cursor-pointer items-center gap-2 justify-between' onClick={() => toggleAddressExpansion(account)}>
            <div className='flex items-center gap-2'>
              {expandedAddresses[account] || isAllExpanded ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
              <h4 className="font-medium text-sm">{formatAddress(account)}</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(account);
                }}
                className="text-xs text-button hover:text-button-hover focus:outline-none ml-2"
                title="Copy address"
              >
                {copiedAddress === account ? <TiTickOutline /> : <FaCopy />}
              </button>
            </div>
            {account.toLowerCase() === connectedAddress?.toLowerCase() && (
              <FaDotCircle className="text-green-500" size={10} title="Connected Address" />
            )}
          </div>

          {expandedAddresses[account] && (
            <div className="mt-2 ml-4">
              {networks.map((network, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => toggleNetworkExpansion(account, index)}
                  >
                    {expandedNetworks[`${account}-${index}`] ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                    <span className="text-xs text-gray-500">{network.network} ({network.chainId})</span>
                  </div>
                  {expandedNetworks[`${account}-${index}`] && (
                    <div className="ml-4 mt-1">
                      <div className='flex justify-between text-xs'>
                        <span>{network.symbol}</span>
                        <span>{parseFloat(parseFloat(network?.nativeBalance).toFixed(6))}</span>
                      </div>
                      {network.tokens.length > 0 && (
                        <ul className="space-y-1 mt-1">
                          {network.tokens.map((token, tokenIndex) => (
                            <li key={tokenIndex} className="flex justify-between text-xs">
                              <span>{token.symbol}</span>
                              <span>{parseFloat(parseFloat(token.balance).toFixed(6))}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
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


// connect wallet button 

const Connect = ({ theme }) => {

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useAccount();
  console.log("balance------------------------->", balance)
  console.log("chain------------------------->", chain)


  if (!isConnected) {
    return null
  }


  const shortenAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className={`flex flex-col items-center bg-sidebar text-sidebar-text rounded-md ${theme}`}>
      <div className='flex items-center px-3'>
      <FaWallet className="" />
        <button
          className="flex items-center px-3 py-1 hover:bg-sidebar-alt transition-colors"
        >
          <span className="mr-2 text-xs">{shortenAddress(address)}</span>
        </button>
      </div>
      <div className="flex  px-3 py-1">
        <span className='text-xs'>{balance?.formatted.slice(0, 6)} {balance?.symbol}</span>
      </div>
    </div>
  )
}







