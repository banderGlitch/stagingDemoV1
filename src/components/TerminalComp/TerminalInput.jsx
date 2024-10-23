import React, { useState } from 'react';
import { TextInput } from '../commonComp';

const TerminalInput = ({ value, onChange, placeholder, suggestions, onSuggestionSelect, theme }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setTimeout(() => setIsFocused(false), 200);

    return (
        <div className={`w-full max-w-3xl mx-auto ${theme}`}>
            <div className="relative">
                {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></span> */}
                <TextInput
                    type="text"
                    className="w-full bg-transparent text-xs text-main-text border border-gray-600 rounded-md py-2 pl-8 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            {isFocused && suggestions && suggestions.length > 0 && (
                <ul className="mt-2 bg-sidebar text-sidebar-text rounded-md overflow-hidden shadow-lg">
                    {suggestions.map((action) => (
                        <li
                            key={action.id}
                            className="px-4 py-2 text-xs hover:bg-sidebar-alt cursor-pointer transition-colors"
                            onClick={() => onSuggestionSelect(action)}
                        >
                            <span className="font-medium">{action.name}</span>
                            <span className="text-sidebar-text-alt ml-2"> - {action.description}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TerminalInput;


// import React, { useState } from 'react';
// import './Terminal.css';
// import { TextInput } from '../commonComp';

// const TerminalInput = ({ value, onChange, placeholder, suggestions, onSuggestionSelect, theme }) => {
//     const [isFocused, setIsFocused] = useState(false);

//     const handleFocus = () => {
//         setIsFocused(true);
//     };

//     const handleBlur = () => {
//         setTimeout(() => setIsFocused(false), 200);
//     };

//     return (
//         <div className={`terminal-container bg-main text-main-text ${theme}`}>
//             <div className="terminal-input-wrapper">
//                 <span className="blinking-cursor"></span>
//                 <TextInput
//                     type="text"
//                     className='terminal-input bg-transparent text-main-text'
//                     value={value}
//                     onChange={onChange}
//                     placeholder={placeholder}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                 />
//             </div>
//             {isFocused && suggestions && suggestions.length > 0 && (
//                 <ul className="terminal-suggestions bg-sidebar text-sidebar-text">
//                     {suggestions.map((action) => (
//                         <li
//                             key={action.id}
//                             className="terminal-suggestion-item hover:bg-sidebar-alt"
//                             onClick={() => onSuggestionSelect(action)}
//                         >
//                             <span className="suggestion-name">{action.name}</span>
//                             <span className="suggestion-description text-sidebar-text-alt"> - {action.description}</span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default TerminalInput;

