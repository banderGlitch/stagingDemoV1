import React from 'react';

const Dropdown = ({options, value, onChange, className }) => {
    return (
        <div>
            {/* <label>{label}</label> */}
            <select value={value} onChange={onChange} className={className}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
