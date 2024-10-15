import React, { useState, useEffect } from 'react';
import { TransactionForm } from '../SuperCommonComp';
import {ReadOnlyTransaction }  from './SendDonateComp';
const SendCrypto = ({ setInput , handleConfirm , showProgress }) => {

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

    // const handleConfirm = () => {
    //     console.log("Confirmed transaction:", { actionType: 'Send', amount, crypto, walletAddress });
    //     // Add your confirmation logic here
    // };




    const handleLetsGo = () => {
        console.log("Let's Go clicked:", { actionType: 'Donate', amount, crypto, walletAddress });
        setIsEditable(false); // Switch to non-editable mode
    };



    return (

        <div>
            {isEditable ? (
                // Editable TransactionForm
                <TransactionForm
                    actionType="Send"
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
                    actionType="Send"
                    amount={amount}
                    crypto={crypto}
                    walletAddress={walletAddress}
                    onConfirm={handleConfirm}
                    onEdit={handleEdit}
                    showProgress={showProgress}
                />
                // Non-editable display of the current values
                // <div className='flex flex-row justify-center'>
                //     <div className='flex flex-row items-center space-x-2'>
                //         <p><strong>Send</strong></p>
                //         <p><strong>{amount}</strong></p>
                //         <p><strong>of</strong></p>
                //         <p><strong> {crypto}</strong></p>
                //         <p><strong>to</strong></p>
                //         <p><strong>{walletAddress}</strong></p>
                //     </div>

                //     {/* Confirm and Edit buttons */}
                //     <div className='ml-4'>
                //         <Button
                //             label="Confirm"
                //             onClick={() => console.log('Confirmed transaction')}
                //             className="bg-blue-500 text-white hover:bg-blue-700"
                //         />
                //         <Button
                //             label="Edit"
                //             onClick={handleEdit}
                //             className="bg-yellow-500 text-white hover:bg-yellow-700 ml-2"
                //         />
                //     </div>
                // </div>
            )}
        </div>
    );
};

export default SendCrypto;





// import React, { useState , useEffect} from 'react';
// import { TransactionForm } from '../SuperCommonComp';
// const SendCrypto = ({ setInput }) => {

//     const cryptoOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'];

//     const fieldInfo = {
//         crypto: 'Enter the crypto symbol, e.g., ETH, BTC',
//         amount: 'Enter the amount to transfer, e.g., 0.1',
//         walletAddress: 'Enter the recipient’s wallet address',
//     };


//     const [crypto, setCrypto] = useState('ETH');
//     const [amount, setAmount] = useState('0.00');
//     const [walletAddress, setWalletAddress] = useState('0xABC123...');
//     const [isEditable, setIsEditable] = useState(true);

//     useEffect(() => {
//         setInput(`Send ${amount} ${crypto} to ${walletAddress}`);
//     }, [amount, crypto, walletAddress, setInput]);

//     const handleEdit = () => {
//         setIsEditable(true);
//     }

//     return (
//         <TransactionForm
//             actionType="Send"
//             setInput={setInput}
//             cryptoOptions={cryptoOptions}
//             fieldInfo={fieldInfo}
//             amount={amount}
//             setAmount={setAmount}
//             crypto={crypto}
//             setCrypto={setCrypto}
//             walletAddress={walletAddress}
//             setWalletAddress={setWalletAddress}
//         />
//     );
// };

// export default SendCrypto;
