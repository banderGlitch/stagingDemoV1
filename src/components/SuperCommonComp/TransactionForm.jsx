import React, { useEffect, useState } from "react";
import { TextInput, NumberInput, Dropdown } from '../commonComp';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { IconComponent } from '../../utils/Icons';

const TransactionForm = ({
    actionType,
    setInput,
    cryptoOptions,
    fieldInfo,
    amount,
    setAmount,
    crypto,
    setCrypto,
    walletAddress,
    setWalletAddress,
    theme,
    onLetsGo,
    onReset
}) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setInput(`${actionType} ${amount} ${crypto} to ${walletAddress}`);
        setIsFormValid(amount && crypto && walletAddress);
    }, [actionType, amount, crypto, walletAddress, setInput]);

    return (
        <div className={`flex items-center justify-between w-full bg-main text-main-text p-4 rounded-lg ${theme}`}>
            <Tooltip
                title="Reset form"
                position="top"
                arrow={true}
                duration={300}
                theme="dark"
            >         
            </Tooltip>

            <div className="flex-grow flex items-center space-x-4">
                <span className="text-lg font-semibold">{actionType}</span>

                <Tooltip
                    title={fieldInfo.amount || "Enter the amount to send"}
                    position="top"
                    arrow={true}
                    duration={300}
                    theme="dark"
                >
                    <NumberInput
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-24 bg-input text-input-text rounded-md px-2 py-1"
                    />
                </Tooltip>

                <span>of</span>

                <Tooltip
                    title={fieldInfo.crypto || "Select the cryptocurrency"}
                    position="top"
                    arrow={true}
                    duration={300}
                    theme="dark"
                >
                    <Dropdown
                        options={cryptoOptions}
                        value={crypto}
                        onChange={(e) => setCrypto(e.target.value)}
                        className="w-23 bg-input text-input-text rounded-md px-2 py-1"
                        theme={theme}
                    />
                </Tooltip>

                <span>to</span>

                <Tooltip
                    title={fieldInfo.walletAddress || "Enter the recipient's wallet address"}
                    position="top"
                    arrow={true}
                    duration={300}
                    theme="dark"
                >
                    <TextInput
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="Wallet Address"
                        className="flex-grow bg-input text-input-text rounded-md px-2 py-1"
                    />
                </Tooltip>
            </div>

            <Tooltip
                title={isFormValid ? "Proceed with transaction" : "Please fill all fields"}
                position="top"
                arrow={true}
                duration={300}
                theme="dark"
            >
                <IconComponent 
                    onClick={isFormValid ? onLetsGo : undefined} 
                    className={`${isFormValid ? 'text-green-500 hover:text-green-600' : 'text-gray-400 cursor-not-allowed'} transition-colors focus:outline-none cursor-pointer`} 
                    name="ArrowRight" 
                    size={24} 
                />
            </Tooltip>
        </div>
    );
};

export default TransactionForm;
// import React, { useEffect, useState } from "react";
// import { TextInput, NumberInput, Dropdown , Button} from '../commonComp';
// import { Tooltip } from 'react-tippy';
// import 'react-tippy/dist/tippy.css';

// const TransactionForm = ({
//     actionType,   // e.g., "Donate" or "Send"
//     setInput,
//     cryptoOptions, // Array of crypto options for dropdown
//     fieldInfo,
//     amount, // Passed from parent
//     setAmount, // Passed from parent
//     crypto, // Passed from parent
//     setCrypto, // Passed from parent
//     walletAddress, // Passed from parent
//     setWalletAddress, // Passed from parent
//     theme,
//     onLetsGo // Callback function to switch to non-editable mode
// }) => {

//     // Update the input field whenever any of the values change
//     const [isButtonEnabled, setIsButtonEnabled] = useState(false);
//     useEffect(() => {
//         setInput(`${actionType} ${amount} ${crypto} to ${walletAddress}`);

//         if (amount && crypto && walletAddress) {
//             setIsButtonEnabled(true);
//         } else {
//             setIsButtonEnabled(false);
//         }

//     }, [actionType, amount, crypto, walletAddress, setInput]);

//     return (
//       <div className={`flex items-center justify-between w-full bg-main text-main-text ${theme}`}>
//         <div className="space-y-2">
//           <div className="flex items-center space-x-2">
//             <h3 className="text-main-text">{actionType}</h3>

//             {/* Amount Input */}
//             <Tooltip title={fieldInfo.amount || "Enter the amount"} position="top" trigger="mouseenter">
//               <NumberInput
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Amount"
//                 className="w-24 flex-grow bg-input text-input-text"
//               />
//             </Tooltip>

//             <span className="text-main-text"> of </span>

//             {/* Crypto Dropdown */}
//             <Tooltip title={fieldInfo.crypto || "Select cryptocurrency"} position="top" trigger="mouseenter">
//               <Dropdown
//                 options={cryptoOptions}
//                 value={crypto}
//                 onChange={(e) => setCrypto(e.target.value)}
//                 className="w-24"
//                 theme={theme}
//               />
//             </Tooltip>

//             <span className="text-main-text"> to </span>

//             {/* Wallet Address Input */}
//             <Tooltip title={fieldInfo.walletAddress || "Enter the wallet address"} position="top" trigger="mouseenter">
//               <TextInput
//                 value={walletAddress}
//                 onChange={(e) => setWalletAddress(e.target.value)}
//                 placeholder="Wallet Address"
//                 className="flex-grow bg-input text-input-text"
//               />
//             </Tooltip>
//             <Button
//               label="Let's Go"
//               onClick={isButtonEnabled ? onLetsGo : undefined}
//               className={`bg-button text-button-text hover:bg-button-hover ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={!isButtonEnabled}
//             />
//           </div>        
//         </div>
//       </div>
//     );

  
//     //   <div className="flex items-center justify-between w-full">
//     //     <div className="space-y-2">
//     //       <div className="flex items-center space-x-2">
//     //         <h3>{actionType}</h3>

//     //         {/* Amount Input */}
//     //         <Tooltip title={fieldInfo.amount || "Enter the amount"} position="top" trigger="mouseenter">
//     //           <NumberInput
//     //             value={amount}
//     //             onChange={(e) => setAmount(e.target.value)}
//     //             placeholder="Amount"
//     //             className="w-24 flex-grow"
//     //           />
//     //         </Tooltip>

//     //         <span> of </span>

//     //         {/* Crypto Dropdown */}
//     //         <Tooltip title={fieldInfo.crypto || "Select cryptocurrency"} position="top" trigger="mouseenter">
//     //           <Dropdown
//     //             options={cryptoOptions}
//     //             value={crypto}
//     //             onChange={(e) => setCrypto(e.target.value)}
//     //             className="w-24"
//     //           />
//     //         </Tooltip>

//     //         <span> to </span>

//     //         {/* Wallet Address Input */}
//     //         <Tooltip title={fieldInfo.walletAddress || "Enter the wallet address"} position="top" trigger="mouseenter">
//     //           <TextInput
//     //             value={walletAddress}
//     //             onChange={(e) => setWalletAddress(e.target.value)}
//     //             placeholder="Wallet Address"
//     //             className="flex-grow"
//     //           />
//     //         </Tooltip>
//     //         <Button
//     //         label="Let's Go"
//     //         onClick={ isButtonEnabled && onLetsGo} // Call the parent's callback to switch to non-editable
//     //         className={`bg-green-500 text-white hover:bg-green-700 ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//     //         disabled={!isButtonEnabled} // Disable the button if not all fields are filled
//     //       />
//     //       </div>        
//     //     </div>
//     //   </div>
//     // );
// };

// export default TransactionForm;

