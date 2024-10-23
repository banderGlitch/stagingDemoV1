import React, { useState, useEffect, useMemo } from 'react';
import searchActions from '../utils/fuzzySearch';
import { SendCrypto, Donate, Vrf } from '../pages';
import { TextInput, Button } from '../components/commonComp';
import TerminalInput from '../components/TerminalComp/TerminalInput';
import ProgressComponent from '../components/Progress/ProgressComponent';
import { useGetProducts, usePostProducts } from '../utils/apiCalls';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { IconComponent } from '../utils/Icons';


const TypeAheadInput = ({ theme }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [progressSteps, setProgressSteps] = useState([]); // Progress steps for selected action
    const [test, setTest] = useState(true)

    const { response, error, loading, refetch: getProducts } = useGetProducts({ initialFetch: false });
    // const { response: postResponse, error: postError, loading: postLoading, refetch: postProducts } = usePostProducts(false);

    // console.log("response----->", response)


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



    const handleConfirm = async () => {
        console.log("Confirmed transaction:", input);
        // Add your confirmation logic here

        const confirmationData = {
            input: input,
        };

        // try {
        //     await postProducts({
        //         method: 'POST',
        //         data: confirmationData
        //     })
        //     console.log("response", postResponse)
        // } catch (error) {
        //     console.error("Error fetching products:", error);
        // }


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
                            <IconComponent
                                onClick={handleReset}
                                className="text-blue-500 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
                                name="Refresh"
                                size={24}
                            />
                        )}
                        <SelectedComponent
                            setInput={setInput}
                            handleConfirm={handleConfirm}
                            showProgress={showProgress}
                            theme={theme}
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
};

export default TypeAheadInput;

