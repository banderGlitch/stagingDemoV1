import React from 'react';

const Dropdown = ({options, value, onChange }) => {
    return (
        <div>
            {/* <label>{label}</label> */}
            <select value={value} onChange={onChange}>
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
