// utils get all balances
import { JsonRpcProvider } from 'ethers';
import { getERC20TransferEvents, getTokenBalances } from '../getAllTokens'; // Assuming these functions are in a separate file

export const getAllBalances = async (accounts, tokensNetworks, options) => {
  let allAccountBalances = [];

  for (let i = 0; i < accounts.length; i++) {
    allAccountBalances[i] = [];
    for (let j = 0; j < tokensNetworks.length; j++) {
      const tokens = await getERC20TransferEvents(accounts[i], tokensNetworks[j].rpc, options);
      const provider = new JsonRpcProvider(tokensNetworks[j].rpc);
      const nativeBalance = await provider.getBalance(accounts[i]);

      if (tokens.length > 0 || nativeBalance > 0) {
        const tokenAddresses = tokens.map(token => token.tokenAddress);
        const tokenBalances = await getTokenBalances(accounts[i], tokenAddresses, tokensNetworks[j].rpc);
        
        allAccountBalances[i][j] = {
          account: accounts[i],
          chainId: tokensNetworks[j].chainId,
          symbol: tokensNetworks[j].currencySymbol,
          network: tokensNetworks[j].name,
          nativeBalances: nativeBalance,
          balances: tokenBalances,
        };
      }
    }
  }

  return allAccountBalances;
};