import React from 'react';

const NumberInput = ({ value, onChange, placeholder, onMouseEnter, onMouseLeave, ...props }) => {
    return (
        <div>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...props}
            />
        </div>
    );
};

export default NumberInput;
