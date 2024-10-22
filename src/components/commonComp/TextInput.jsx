import React from 'react';

const TextInput = ({ value, onChange, placeholder, className, onFocus, onBlur, ref }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                className={`bg-input text-input-text ${className}`}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={ref}
            />
        </div>
    );
};

export default TextInput;
