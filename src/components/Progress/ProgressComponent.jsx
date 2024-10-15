import React, { useState, useEffect } from 'react';
import { Button } from '../commonComp';
import './Progress.css'; // Ensure this CSS file is properly referenced

const terminalSpinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const ProgressComponent = ({ steps, handleReset }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [displayedSteps, setDisplayedSteps] = useState([steps[0]]); // Show only the first step initially
    const [spinnerIndex, setSpinnerIndex] = useState(0); // For spinner animation

    // Simulate the sequential progress with a time delay for showing one step at a time
    useEffect(() => {
        if (currentStepIndex < steps.length - 1) {
            const timer = setTimeout(() => {
                setDisplayedSteps((prevSteps) => [...prevSteps, steps[currentStepIndex + 1]]);
                setCurrentStepIndex((prevIndex) => prevIndex + 1);
            }, 3000); // 3 seconds delay between steps
            return () => clearTimeout(timer);
        }
    }, [currentStepIndex, steps]);

    // Spinner effect for the in-progress step
    useEffect(() => {
        if (currentStepIndex < steps.length - 1) {
            const spinnerTimer = setInterval(() => {
                setSpinnerIndex((prevIndex) => (prevIndex + 1) % terminalSpinner.length);
            }, 100); // Spinner changes every 100ms
            return () => clearInterval(spinnerTimer);
        }
    }, [currentStepIndex, steps.length]);

    return (
        <div className='flex flex-col items-center gap-5'>
            <div className="progress-terminal">
                {displayedSteps.map((step, index) => (
                    <div key={index} className={`progress-step ${index === currentStepIndex ? 'in-progress' : 'completed'}`}>
                        {index === currentStepIndex && currentStepIndex < steps.length - 1
                            ? `${terminalSpinner[spinnerIndex]} ${step}`
                            : `✓ ${step}`}
                    </div>
                ))}
            </div>
            <Button onClick={handleReset} className='' label="Reset" />
        </div>
    );
};

export default ProgressComponent;

// import React, { useState, useEffect } from 'react';
// import './Progress.css'; // New CSS for terminal-like design

// // A set of terminal "spinner" characters to simulate the in-progress state
// const terminalSpinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// const ProgressComponent = ({ steps }) => {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [displayedSteps, setDisplayedSteps] = useState([steps[0]]); // Show only the first step initially
//   const [spinnerIndex, setSpinnerIndex] = useState(0); // For spinner animation

//   // Simulate the sequential progress with a time delay for showing one step at a time
//   useEffect(() => {
//     if (currentStepIndex < steps.length - 1) {
//       const timer = setTimeout(() => {
//         // Show the next step by appending it to displayedSteps
//         setDisplayedSteps((prevSteps) => [...prevSteps, steps[currentStepIndex + 1]]);
//         setCurrentStepIndex((prevIndex) => prevIndex + 1);
//       }, 3000); // 3 seconds delay between steps
//       return () => clearTimeout(timer); // Cleanup timer
//     }
//   }, [currentStepIndex, steps]);

//   // Spinner effect for the in-progress step
//   useEffect(() => {
//     const spinnerTimer = setInterval(() => {
//       setSpinnerIndex((prevIndex) => (prevIndex + 1) % terminalSpinner.length);
//     }, 100); // Spinner changes every 100ms
//     return () => clearInterval(spinnerTimer);
//   }, []);

//   return (
//     <div className="progress-terminal">
//       {displayedSteps.map((step, index) => (
//         <div key={index} className={`progress-step ${index === currentStepIndex ? 'in-progress' : ''}`}>
//           {index === currentStepIndex ? `${terminalSpinner[spinnerIndex]} ${step}` : `✓ ${step}`}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProgressComponent;

// import React, { useState, useEffect } from 'react';
// import './Progress.css';

// const ProgressComponent = ({ steps }) => {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [displayedSteps, setDisplayedSteps] = useState([steps[0]]); // Show only the first step initially

//   // Simulate the sequential progress with time delay for showing one step at a time
//   useEffect(() => {
//     if (currentStepIndex < steps.length - 1) {
//       const timer = setTimeout(() => {
//         // Show the next step by appending it to displayedSteps
//         setDisplayedSteps((prevSteps) => [...prevSteps, steps[currentStepIndex + 1]]);
//         setCurrentStepIndex((prevIndex) => prevIndex + 1);
//       }, 2000); // 2 seconds delay between steps
//       return () => clearTimeout(timer); // Cleanup timer
//     }
//   }, [currentStepIndex, steps]);

//   return (
//     <div className="progress-container">
//       <h4>Order Progress</h4>
//       <ul className="progress-list">
//         {displayedSteps.map((step, index) => (
//           <li key={index} className={`progress-step active`}>
//             {step}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProgressComponent;


// import React, { useState, useEffect } from 'react';
// import './Progress.css';
// const ProgressComponent = ({ steps }) => {
//   const [currentStep, setCurrentStep] = useState(0);

//   // Simulate the sequential progress with time delay
//   useEffect(() => {
//     if (currentStep < steps.length) {
//       const timer = setTimeout(() => {
//         setCurrentStep((prevStep) => prevStep + 1);
//       }, 2000); // 2 seconds delay between steps
//       return () => clearTimeout(timer); // Cleanup timer
//     }
//   }, [currentStep, steps]);

//   return (
//     <div className="progress-container">
//       <h4>Order Progress</h4>
//       <ul className="progress-list">
//         {steps.map((step, index) => (
//           <li key={index} className={`progress-step ${index <= currentStep ? 'active' : ''}`}>
//             {step}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProgressComponent;
