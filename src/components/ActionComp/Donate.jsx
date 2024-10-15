import React from 'react';
import { TransactionForm } from '../SuperCommonComp';
const Donate = ({ setInput }) => {

    const cryptoOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'];

    const fieldInfo = {
        crypto: 'Enter the crypto symbol, e.g., ETH, BTC',
        amount: 'Enter the amount to transfer, e.g., 0.1',
        walletAddress: 'Enter the recipient’s wallet address',
    };

    const executeTransaction = () => {
        console.log("Executing transaction:", { actionType, amount, crypto, walletAddress });
        // Add your execution logic here
      };

    return (
        <TransactionForm
            actionType="Donate" // Set action type to "Donate"
            setInput={setInput}
            cryptoOptions={cryptoOptions}
            fieldInfo={fieldInfo}
            executeTransaction={executeTransaction}
        />
    );
};

export default Donate;






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
