
import { ethers, JsonRpcProvider  } from 'ethers'
import { useState, useEffect } from 'react'
import TypeAheadInput from './components/TypeAheadInput'
import ConnectButton from './utils/connectButton'
import { getERC20TransferEvents,getTokenBalances } from './getAllTokens.js'
import { useAccount, useBalance, usePublicClient, useWalletClient, useDisconnect } from 'wagmi';
import { tokensNetworks } from './constant'
import Web3 from 'web3';

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
        if (tokens.length > 0 ||  nativeBalance > 0) {
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





  return (
    <div className="flex justify-center m-12">
      <div className="text-center">
        {/* <ConnectButton /> */}
        <TypeAheadInput />
      </div>
    </div>
  )
}

export default App

