import React, { useState, useEffect } from 'react';
import {ReadOnlyTransaction}  from '../components/ActionComp/SendDonateComp';
import { TransactionForm } from '../components/SuperCommonComp';
const Donate = ({ setInput , handleConfirm ,  showProgress}) => {

    const cryptoOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'];

    const fieldInfo = {
        crypto: 'Enter the crypto symbol, e.g., ETH, BTC',
        amount: 'Enter the amount to transfer, e.g., 0.1',
        walletAddress: 'Enter the recipient’s wallet address',
    };


    const [crypto, setCrypto] = useState('ETH');
    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [isEditable, setIsEditable] = useState(true);

    useEffect(() => {
        setInput(`Send ${amount} ${crypto} to ${walletAddress}`);
    }, [amount, crypto, walletAddress, setInput]);

    const handleEdit = () => {
        setIsEditable(true);
    }




    const handleLetsGo = () => {
        console.log("Let's Go clicked:", { actionType: 'Donate', amount, crypto, walletAddress });
        setIsEditable(false); // Switch to non-editable mode
    };




    return (

        <div>
            {isEditable ? (
                // Editable TransactionForm
                <TransactionForm
                    actionType="Donate"
                    setInput={setInput}
                    cryptoOptions={cryptoOptions}
                    fieldInfo={fieldInfo}
                    amount={amount}
                    crypto={crypto}
                    walletAddress={walletAddress}
                    setAmount={setAmount}
                    setCrypto={setCrypto}
                    setWalletAddress={setWalletAddress}
                    onLetsGo={handleLetsGo} // Callback when "Let's Go" is clicked
                />
            ) : (
                <ReadOnlyTransaction
                    actionType="Donate"
                    amount={amount}
                    crypto={crypto}
                    walletAddress={walletAddress}
                    onConfirm={handleConfirm}
                    onEdit={handleEdit}
                    showProgress={showProgress}
                />
            )}
        </div>
    );
};

export default Donate;


