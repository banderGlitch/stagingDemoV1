import { ethers } from 'ethers';

// ERC20 Transfer event interface
const ERC20_TRANSFER_EVENT = [
    "event Transfer(address indexed from, address indexed to, uint256 value)"
];

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)"
];

export async function getERC20TransferEvents(
    address,
    rpcUrl,
    options = {
        startBlock: 0,
        endBlock: 'latest',
        batchSize: 2000,
        maxRetries: 3,
        delayBetweenRetries: 1000
    }
) {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const transferEvents = [];
    let currentBlock = options.startBlock;
    let latestBlock = options.endBlock;
    try {
        // Get latest block if endBlock is 'latest'
        if (latestBlock === 'latest') {
            latestBlock = await provider.getBlockNumber();
        }

        const iface = new ethers.Interface(ERC20_TRANSFER_EVENT);
        while (currentBlock < latestBlock) {
            const fromBlock = currentBlock;
            const toBlock = Math.min(currentBlock + options.batchSize, latestBlock);

            let retries = 0;
            let success = false;

            while (!success && retries < options.maxRetries) {
                try {
                    // Create filter for Transfer events
                    const filter = {
                        topics: [
                            iface.getEvent('Transfer').topicHash,
                            null,  // from address (any)
                            ethers.zeroPadValue(address.toLowerCase(), 32)  // to address
                        ],
                        fromBlock: fromBlock,
                        toBlock: toBlock
                    };

                    // Get logs
                    const logs = await provider.getLogs(filter);

                    // Process incoming transfers
                    for (const log of logs) {
                        const parsedLog = iface.parseLog({
                            topics: log.topics,
                            data: log.data
                        });
                        const tokenContract = new ethers.Contract(
                            log.address,
                            [
                                "function name() view returns (string)",
                                "function symbol() view returns (string)",
                                "function decimals() view returns (uint8)"
                            ],
                            provider
                        );
                        
                        // Get token details
                        const [name, symbol, decimals] = await Promise.all([
                            tokenContract.name().catch(() => 'Unknown'),
                            tokenContract.symbol().catch(() => 'Unknown'),
                            tokenContract.decimals().catch(() => 18)
                        ]);

                        transferEvents.push({
                            transactionHash: log.transactionHash,
                            blockNumber: log.blockNumber,
                            tokenAddress: log.address,
                            tokenName: name,
                            tokenSymbol: symbol,
                            from: parsedLog.args[0],
                            to: parsedLog.args[1],
                            value: parsedLog.args[2],
                            formattedValue: ethers.formatUnits(parsedLog.args[2], decimals),
                            decimals: decimals
                        });
                        
                    }

                    // Also check outgoing transfers
                    const outgoingFilter = {
                        topics: [
                            iface.getEvent('Transfer').topicHash,
                            ethers.zeroPadValue(address.toLowerCase(), 32),  // from address
                            null  // to address (any)
                        ],
                        fromBlock: fromBlock,
                        toBlock: toBlock
                    };

                    const outgoingLogs = await provider.getLogs(outgoingFilter);

                    // Process outgoing transfers
                    for (const log of outgoingLogs) {
                        const parsedLog = iface.parseLog({
                            topics: log.topics,
                            data: log.data
                        });

                        const tokenContract = new ethers.Contract(
                            log.address,
                            [
                                "function name() view returns (string)",
                                "function symbol() view returns (string)",
                                "function decimals() view returns (uint8)"
                            ],
                            provider
                        );

                        // Get token details
                        const [name, symbol, decimals] = await Promise.all([
                            tokenContract.name().catch(() => 'Unknown'),
                            tokenContract.symbol().catch(() => 'Unknown'),
                            tokenContract.decimals().catch(() => 18)
                        ]);

                        transferEvents.push({
                            transactionHash: log.transactionHash,
                            blockNumber: log.blockNumber,
                            tokenAddress: log.address,
                            tokenName: name,
                            tokenSymbol: symbol,
                            from: parsedLog.args[0],
                            to: parsedLog.args[1],
                            value: parsedLog.args[2],
                            formattedValue: ethers.formatUnits(parsedLog.args[2], decimals),
                            decimals: decimals
                        });
                        
                    }

                    success = true;
                } catch (error) {
                    retries++;
                    if (retries >= options.maxRetries) {
                        throw new Error(`Failed to fetch events after ${options.maxRetries} retries: ${error.message}`);
                    }
                    await new Promise(resolve => setTimeout(resolve, options.delayBetweenRetries));
                }
            }

            currentBlock = toBlock + 1;
            console.log(`Processed blocks ${fromBlock} to ${toBlock}`);
        }

        // Sort events by block number
        transferEvents.sort((a, b) => a.blockNumber - b.blockNumber);

        return transferEvents;

    } catch (error) {
        throw new Error(`Error fetching transfer events: ${error.message}`);
    }
}

export async function getTokenBalances(accountAddress,tokenAddresses, rpcUrl){
    try {
        // Initialize provider
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        // Array to store token balances
        const tokenBalances = [];

        // Fetch balances for each token
        for (const tokenAddress of tokenAddresses) {
            const tokenContract = new ethers.Contract(
                tokenAddress,
                ERC20_ABI,
                provider
            );

            try {
                // Fetch token details and balance
                const [balance, decimals, symbol, name] = await Promise.all([
                    tokenContract.balanceOf(accountAddress),
                    tokenContract.decimals(),
                    tokenContract.symbol(),
                    tokenContract.name()
                ]);

                // Convert balance to human readable format
                const formattedBalance = ethers.formatUnits(balance, decimals);

                tokenBalances.push({
                    tokenAddress,
                    name,
                    symbol,
                    balance: formattedBalance,
                    decimals,
                    rawBalance: balance.toString()
                });
            } catch (error) {
                // Continue with next token if one fails
                continue;
            }
        }

        return tokenBalances;

    } catch (error) {
        throw new Error(`Failed to fetch token balances: ${error.message}`);
    }

}

// Example usage
// async function main() {
//     const address = '0x17d7565b1E8eD70060fcb01CD11e323357f5a71B';
//     const rpcUrl = 'https://bartio.rpc.berachain.com';
    
//     const options = {
//         startBlock: 5729600, // Starting block number
//         endBlock: 'latest',   // Latest block or specific block number
//         batchSize: 10000,      // Number of blocks to query at once
//         maxRetries: 3,        // Maximum retry attempts for failed requests
//         delayBetweenRetries: 1000 // Delay between retries in milliseconds
//     };

//     try {
//         console.log('Fetching transfer events...');
//         const events = await getERC20TransferEvents(address, rpcUrl, options);
//         console.log('Transfer events:', events);
//         console.log(`Total events found: ${events.length}`);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// main();