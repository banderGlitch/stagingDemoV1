import React from 'react';
import { TransactionForm } from '../SuperCommonComp';
const SendCrypto = ({ setInput }) => {

    const cryptoOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'];

    const fieldInfo = {
        crypto: 'Enter the crypto symbol, e.g., ETH, BTC',
        amount: 'Enter the amount to transfer, e.g., 0.1',
        walletAddress: 'Enter the recipient’s wallet address',
    };

    return (
        <TransactionForm
            actionType="Send"
            setInput={setInput}
            cryptoOptions={cryptoOptions}
            fieldInfo={fieldInfo}
        />
    );
};

export default SendCrypto;
