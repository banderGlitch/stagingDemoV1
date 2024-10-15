import React from 'react';
import { Button } from '../../common'; // Reusable Button component

const ReadOnlyTransaction = ({ actionType, amount, crypto, walletAddress, onConfirm, onEdit }) => {
    return (
        <div className='flex flex-row justify-center'>
            <div className='flex flex-row items-center space-x-2'>
                <p><strong>{actionType}</strong></p>
                <p><strong>{amount}</strong></p>
                <p><strong>of</strong></p>
                <p><strong> {crypto}</strong></p>
                <p><strong>to</strong></p>
                <p><strong>{walletAddress}</strong></p>
            </div>

            {/* Confirm and Edit buttons */}
            <div className='ml-4'>
                <Button
                    label="Confirm"
                    onClick={onConfirm}
                    className="bg-blue-500 text-white hover:bg-blue-700"
                />
                <Button
                    label="Edit"
                    onClick={onEdit}
                    className="bg-yellow-500 text-white hover:bg-yellow-700 ml-2"
                />
            </div>
        </div>
    );
};

export default ReadOnlyTransaction;
