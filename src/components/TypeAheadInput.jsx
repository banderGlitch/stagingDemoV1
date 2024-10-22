import React, { useState, useEffect } from 'react';
import searchActions from '../utils/fuzzySearch';
import { SendCrypto, Donate, Vrf } from './ActionComp';
import { TextInput, Button } from './commonComp';
import TerminalInput from './TerminalComp/TerminalInput';
import ProgressComponent from './Progress/ProgressComponent';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';


const TypeAheadInput = ({ theme }) => {
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
        console.log('action-------------->', action);
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




    const SelectedComponent = selectedAction ? actionComponents[selectedAction.name] : null;

    return (
        <div className={`min-h-screen p-8 bg-main text-main-text ${theme}`}>
            {SelectedComponent ? (
                <div className='flex flex-col items-center gap-5'>
                    <div className='flex flex-row items-center gap-5'>
                        {!showProgress && (
                            <Button 
                                onClick={handleReset} 
                                className="bg-button text-button-text hover:opacity-80" 
                                label="Reset" 
                            />
                        )}
                        <SelectedComponent 
                            setInput={setInput} 
                            handleConfirm={handleConfirm} 
                            showProgress={showProgress} 
                        />
                    </div>
                    {showProgress && (
                        <ProgressComponent 
                            steps={progressSteps} 
                            showProgress={showProgress} 
                            handleReset={handleReset}
                        />
                    )}
                </div>
            ) : (            
                <TerminalInput
                    value={input}
                    onChange={handleChange}
                    placeholder="Start typing your task..."
                    suggestions={suggestions}
                    onSuggestionSelect={handleSelect}
                />
            )}
        </div>
    );

    // return (
    //     <div className={`min-h-screen p-8`}>
    //         {SelectedComponent ? (
    //             <div className='flex flex-col items-center gap-5'>
    //                 <div className='flex flex-row items-center gap-5'>
    //                     {!showProgress && (
    //                         <Button
    //                             onClick={handleReset}
    //                             className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} hover:opacity-80`}
    //                             label="Reset"
    //                         />
    //                     )}
    //                     <SelectedComponent
    //                         setInput={setInput}
    //                         handleConfirm={handleConfirm}
    //                         showProgress={showProgress}
    //                         theme={theme}
    //                     />
    //                 </div>
    //                 {showProgress && (
    //                     <ProgressComponent
    //                         steps={progressSteps}
    //                         showProgress={showProgress}
    //                         handleReset={handleReset}
    //                         theme={theme}
    //                     />
    //                 )}
    //             </div>
    //         ) : (
    //             <TerminalInput
    //                 value={input}
    //                 onChange={handleChange}
    //                 placeholder="Start typing your task..."
    //                 suggestions={suggestions}
    //                 onSuggestionSelect={handleSelect}
    //                 theme={theme}
    //             />
    //         )}
    //     </div>
    // );


    // return (
    //     <div className={`text-white min-h-screen p-8 ${theme}`}>
    //         {SelectedComponent ? (
    //             <div className='flex flex-col items-center gap-5'>
    //                 <div className='flex flex-row items-center gap-5'>
    //                     {!showProgress &&
    //                         <Button onClick={handleReset} className='bg-gray-700 text-white' label="Reset" />
    //                     }
    //                     <SelectedComponent setInput={setInput} handleConfirm={handleConfirm} showProgress={showProgress} />
    //                 </div>
    //                 {showProgress && <ProgressComponent steps={progressSteps} showProgress={showProgress} handleReset={handleReset} />}
    //             </div>
    //         ) : (            
    //             <TerminalInput
    //                 value={input}
    //                 onChange={handleChange}
    //                 placeholder="Start typing your task..."
    //                 suggestions={suggestions}
    //                 onSuggestionSelect={handleSelect}
    //             />
    //         )}
    //     </div>
    // );
};

export default TypeAheadInput;

