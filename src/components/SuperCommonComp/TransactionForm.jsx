import React, { useEffect, useState } from "react";
import { TextInput, NumberInput, Dropdown , Button} from '../commonComp';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const TransactionForm = ({
    actionType,   // e.g., "Donate" or "Send"
    setInput,
    cryptoOptions, // Array of crypto options for dropdown
    fieldInfo,
    amount, // Passed from parent
    setAmount, // Passed from parent
    crypto, // Passed from parent
    setCrypto, // Passed from parent
    walletAddress, // Passed from parent
    setWalletAddress, // Passed from parent
    onLetsGo // Callback function to switch to non-editable mode
}) => {

    // Update the input field whenever any of the values change
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    useEffect(() => {
        setInput(`${actionType} ${amount} ${crypto} to ${walletAddress}`);

        if (amount && crypto && walletAddress) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }

    }, [actionType, amount, crypto, walletAddress, setInput]);

    return (
      <div className="flex items-center justify-between w-full">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3>{actionType}</h3>

            {/* Amount Input */}
            <Tooltip title={fieldInfo.amount || "Enter the amount"} position="top" trigger="mouseenter">
              <NumberInput
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-24 flex-grow"
              />
            </Tooltip>

            <span> of </span>

            {/* Crypto Dropdown */}
            <Tooltip title={fieldInfo.crypto || "Select cryptocurrency"} position="top" trigger="mouseenter">
              <Dropdown
                options={cryptoOptions}
                value={crypto}
                onChange={(e) => setCrypto(e.target.value)}
                className="w-24"
              />
            </Tooltip>

            <span> to </span>

            {/* Wallet Address Input */}
            <Tooltip title={fieldInfo.walletAddress || "Enter the wallet address"} position="top" trigger="mouseenter">
              <TextInput
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Wallet Address"
                className="flex-grow"
              />
            </Tooltip>
            <Button
            label="Let's Go"
            onClick={ isButtonEnabled && onLetsGo} // Call the parent's callback to switch to non-editable
            className={`bg-green-500 text-white hover:bg-green-700 ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isButtonEnabled} // Disable the button if not all fields are filled
          />
          </div>        
        </div>
      </div>
    );
};

export default TransactionForm;

