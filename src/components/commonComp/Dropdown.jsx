import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, value, onChange, className, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`relative ${theme}`}>
            <div
                className={`bg-input text-input-text cursor-pointer p-2 ${className}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value}
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-input text-input-text shadow-lg">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="cursor-pointer p-2 hover:bg-sidebar-alt"
                            onClick={() => {
                                onChange({ target: { value: option } });
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
