import React from 'react';

const TextInput = ({ value, onChange, placeholder }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;
