import React from 'react';
import { Button } from '../Common';
const Vrf = () => {
    const handleVrf = () => {
        console.log('Generating Random Number...');
    };

    return (
        <div className='flex justify-center items-center gap-4'>
            <h3>Generating Random Number</h3>
            <Button
                label="Generate"
                onClick={handleVrf}
                className="bg-blue-500 text-white hover:bg-blue-700 " // Custom styles
            />
        </div>
    );
};

export default Vrf;