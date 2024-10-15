import React, { useState, useEffect } from 'react';
import searchActions from '../utils/fuzzySearch';
import { SendCrypto, Donate, Vrf } from './ActionComp';
import { TextInput } from './Common';

const TypeAheadInput = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);

    // Component mapping for each action
    const actionComponents = {
        'Send Crypto': SendCrypto,
        'Donate': Donate,
        'Vrf': Vrf,
    };

    const handleChange = (event) => {
        const query = event.target.value;
        setInput(query);
        if (query.length > 0) {
            setSuggestions(searchActions(query));
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (action) => {
        setSelectedAction(action);
        setSuggestions([]);

        if (action.name === 'Generate Random Number') {
            console.log('Generating Random Number');
            setInput('');
        }
    };


    const handleReset = () => {
        // Clear the suggestions
        setSelectedAction(null);
        // Optionally, you can reset the input to its initial state
        setInput('');
    };




    useEffect(() => {
        console.log('input-------------->', input);
    }, [input]);


    const SelectedComponent = selectedAction ? actionComponents[selectedAction.name] : null;
    console.log("SelectedComponent", SelectedComponent);
    console.log("selectedAction", selectedAction?.name);

    return (
        <div>
            {SelectedComponent ? (
                <div className='flex flex-row items-center gap-5'>
                    {/* Reset Button to clear suggestions and reset input */}
                    <button onClick={handleReset} className=''>Reset</button>
                    {/* Render the selected action component */}
                    <SelectedComponent setInput={setInput} />
                </div>
            ) : (
                <div>
                    <TextInput type="text" value={input} onChange={handleChange} placeholder="Start typing your task..." />
                    {suggestions.length > 0 && (
                        <ul>
                            {suggestions.map(action => (
                                <li key={action.id} onClick={() => handleSelect(action)} className='hover:bg-gray-100 cursor-pointer'>
                                    {action.name} - {action.description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default TypeAheadInput;



// import React, { useState, useEffect } from 'react'
// import searchActions from '../utils/fuzzySearch';
// import SendCrypto from './ActionComp/SendCrypto';
// import Donate from './ActionComp/Donate';
// import Vrf from './ActionComp/Vrf';

// const TypeAheadInput = () => {
//     const [input, setInput] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [selectedAction, setSelectedAction] = useState(null);

//     const [editableField, setEditableField] = useState({
//         crypto: 'Eth',
//         amount: '0.00',
//         walletAddress: '0x0000...'
//     });

//     const handleChange = (event) => {
//         const query = event.target.value;
//         setInput(query);
//         if (query.length > 0) {
//             setSuggestions(searchActions(query));
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSelect = (action) => {
//         setSelectedAction(action);
//         if (action.name === 'Generate Random Number') {
//             // direct call to vrf
//             console.log("Generating Random Number");
//             setInput('');
//         } else {
//             setInput(`${action.name} from my ${editableField.crypto || 'Crypto'} to ${editableField.walletAddress || 'wallet address'}`);
//         }
//         setSuggestions([]);

//     };

//     const handleEditableFieldChange = (event, fieldName) => {
//         const value = event.target.value;
//         setEditableField(prevState => ({ ...prevState, [fieldName]: value }));
//         // Update the input field to include the new values
//         setInput(`${selectedAction.name} from my ${fieldName === 'crypto' ? value : editableField.crypto || 'Crypto'} to ${fieldName === 'walletAddress' ? value : editableField.walletAddress || 'wallet address'}`);
//     };

//     useEffect(() => {
//         console.log("input-------------->", input);
//     }, [input]);
//     return (
//         <div>
//             {selectedAction ? (
//                <div>
//                     {/* Conditionally render components based on selected action */}
//                     {selectedAction.name === 'Send Crypto' && (
//                         <SendCrypto setInput={setInput} />
//                     )}
//                     {selectedAction.name === 'Donate' && (
//                         <Donate setInput={setInput} />
//                     )}
//                     {selectedAction.name === 'Vrf' && (
//                         <Vrf />
//                     )}
//                 </div>
//             ) : (
//                 <div>
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={handleChange}
//                         placeholder="Start typing your task..."
//                     />
//                     {suggestions.length > 0 && (
//                         <ul>
//                             {suggestions.map(action => (
//                                 <li key={action.id} onClick={() => handleSelect(action)}>
//                                     {action.name} - {action.description}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default TypeAheadInput;


//  import React, { useState } from 'react'
// import searchActions from '../utils/fuzzySearch';
// import ActionTemplate from './ActionTemplate';
// const TypeAheadInput = ({ onActionSelect }) => {

//     const [input, setInput] = useState('');
//     const [suggestions, setSuggestions] = useState([]);


//     const handleChange = (event) => {
//         const query = event.target.value;
//         setInput(query);
//         if (query.length > 0) {
//             setSuggestions(searchActions(query));
//         } else {
//             setSuggestions([]);
//         }
//     };
//     const handleSelect = (action) => {

//         console.log("action", action);
//         onActionSelect(action);
//         setInput('');
//         setSuggestions([]);
//     };


//     return (
//         <div>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={handleChange}
//                 placeholder="Start typing your task..."
//             />
//             {suggestions.length > 0 && (
//                 <ul>
//                     {suggestions.map(action => (
//                         <li key={action.id} onClick={() => handleSelect(action)}>
//                             {action.name} - {action.description}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );

// }

// export default TypeAheadInput;

