import React, { useState } from 'react';
import './Terminal.css';
import { TextInput } from '../commonComp';

const TerminalInput = ({ value, onChange, placeholder, suggestions, onSuggestionSelect, theme }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 200);
    };

    return (
        <div className={`terminal-container bg-main text-main-text ${theme}`}>
            <div className="terminal-input-wrapper">
                <span className="blinking-cursor"></span>
                <TextInput
                    type="text"
                    className='terminal-input bg-transparent text-main-text'
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            {isFocused && suggestions && suggestions.length > 0 && (
                <ul className="terminal-suggestions bg-sidebar text-sidebar-text">
                    {suggestions.map((action) => (
                        <li
                            key={action.id}
                            className="terminal-suggestion-item hover:bg-sidebar-alt"
                            onClick={() => onSuggestionSelect(action)}
                        >
                            <span className="suggestion-name">{action.name}</span>
                            <span className="suggestion-description text-sidebar-text-alt"> - {action.description}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TerminalInput;

// import React, { useState, useRef, useEffect } from 'react';
// import './Terminal.css';
// import { TextInput } from '../commonComp';

// const TerminalInput = ({ value, onChange, placeholder, suggestions, onSuggestionSelect }) => {
//     const [isFocused, setIsFocused] = useState(false);

//     const handleFocus = () => {
//         setIsFocused(true);
//     };

//     const handleBlur = () => {
//         setTimeout(() => setIsFocused(false), 200);
//     };




//     return (
//         <div className="terminal-container">
//             <div className="terminal-input-wrapper">
//                 <span className="blinking-cursor"></span>
//                 <TextInput
//                     type="text"
//                     className='terminal-input'
//                     value={value}
//                     onChange={onChange}
//                     placeholder={placeholder}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                 />
//             </div>
//             {isFocused && suggestions && suggestions.length > 0 && (
//                 <ul className="terminal-suggestions">
//                     {suggestions.map((action) => (
//                         <li
//                             key={action.id}
//                             className="terminal-suggestion-item"
//                             onClick={() => onSuggestionSelect(action)}
//                         >
//                             <span className="suggestion-name">{action.name}</span>
//                             <span className="suggestion-description"> - {action.description}</span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default TerminalInput;
