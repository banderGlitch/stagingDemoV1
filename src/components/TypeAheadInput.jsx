import React, { useState, useEffect } from 'react';
import searchActions from '../utils/fuzzySearch';
import { SendCrypto, Donate, Vrf } from './ActionComp';
import { TextInput, Button } from './commonComp';
import ProgressComponent from './Progress/ProgressComponent';

const TypeAheadInput = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [progressSteps, setProgressSteps] = useState([]); // Progress steps for selected action

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
        setShowProgress(false);
        console.log('action-------------->', action.name);
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
        setShowProgress(false);
    };



    const handleConfirm = () => {
        console.log("Confirmed transaction:", input);
        // Add your confirmation logic here

        const steps = [
            'Placing your order in solver ecosystem...',
            'Finding solver...',
            'Solver found!',
            'Order assigned to solver...',
            'Task executed!',
        ];
        setProgressSteps(steps);
        setShowProgress(true);
    };





    useEffect(() => {
        console.log('input-------------->', input);
    }, [input]);


    const SelectedComponent = selectedAction ? actionComponents[selectedAction.name] : null;


    return (
        <div>
            {SelectedComponent ? (
                <div className='flex flex-col items-center gap-5'>
                    {/* Reset Button to clear suggestions and reset input */}
                    <div className='flex flex-row items-center gap-5'>
                        {!showProgress &&
                        <Button onClick={handleReset} className='' label="Reset"/>
                        }
                        {/* Render the selected action component */}
                        <SelectedComponent setInput={setInput} handleConfirm={handleConfirm} showProgress={showProgress} />
                    </div>
                    {showProgress && <ProgressComponent steps={progressSteps} showProgress={showProgress} handleReset={handleReset} />}
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

