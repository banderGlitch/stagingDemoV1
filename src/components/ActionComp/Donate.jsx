import React, { useState, useEffect } from 'react';
import {ReadOnlyTransaction}  from './SendDonateComp';
import { TransactionForm } from '../SuperCommonComp';
const Donate = ({ setInput }) => {

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

    
    const handleConfirm = () => {
        console.log("Confirmed transaction:", { actionType: 'Send', amount, crypto, walletAddress });
        // Add your confirmation logic here
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
                // Non-editable display of the current values
                // <div className='flex flex-row justify-center'>
                //     <div className='flex flex-row items-center space-x-2'>
                //         <p><strong>Donate</strong></p>
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
                <ReadOnlyTransaction
                    actionType="Donate"
                    amount={amount}
                    crypto={crypto}
                    walletAddress={walletAddress}
                    onConfirm={handleConfirm}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default Donate;










// import React from 'react';
// import { TransactionForm } from '../SuperCommonComp';
// const Donate = ({ setInput }) => {

//     const cryptoOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'];

//     const fieldInfo = {
//         crypto: 'Enter the crypto symbol, e.g., ETH, BTC',
//         amount: 'Enter the amount to transfer, e.g., 0.1',
//         walletAddress: 'Enter the recipient’s wallet address',
//     };

//     const executeTransaction = () => {
//         console.log("Executing transaction:", { actionType, amount, crypto, walletAddress });
//         // Add your execution logic here
//       };

//     return (
//         <TransactionForm
//             actionType="Donate" // Set action type to "Donate"
//             setInput={setInput}
//             cryptoOptions={cryptoOptions}
//             fieldInfo={fieldInfo}
//             executeTransaction={executeTransaction}
//         />
//     );
// };

// export default Donate;






// import React, { useState, useEffect } from 'react';

// const Donate = ({ setInput }) => {
//     const [crypto, setCrypto] = useState('BTC');
//     const [amount, setAmount] = useState('0.10');
//     const [walletAddress, setWalletAddress] = useState('Charity Wallet Address');

//     // Update the input field when any of the fields change
//     useEffect(() => {
//         setInput(`Donate ${amount} ${crypto} to ${walletAddress}`);
//     }, [amount, crypto, walletAddress, setInput]);

//     return (
//         <div>
//             <h3>Donate Crypto</h3>
//             <div>
//                 <input
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     placeholder="Amount"
//                 />
//                 <span> of </span>
//                 <input
//                     type="text"
//                     value={crypto}
//                     onChange={(e) => setCrypto(e.target.value)}
//                     placeholder="Crypto"
//                 />
//                 <span> to </span>
//                 <input
//                     type="text"
//                     value={walletAddress}
//                     onChange={(e) => setWalletAddress(e.target.value)}
//                     placeholder="Charity wallet address"
//                 />
//             </div>
//         </div>
//     );
// };

// export default Donate;
