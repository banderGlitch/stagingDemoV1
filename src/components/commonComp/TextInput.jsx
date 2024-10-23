import React from 'react';

const TextInput = ({ className, ...props }) => {
    return (
        <input
            type="text"
            className={`bg-input text-input-text ${className}`}
            {...props}
        />
    );
};

export default TextInput;


// import React from 'react';

// const TextInput = ({ value, onChange, placeholder, className, onFocus, onBlur, ref }) => {
//     return (
//         <div>
//             <input
//                 type="text"
//                 value={value}
//                 className={`bg-input text-input-text ${className}`}
//                 onChange={onChange}
//                 placeholder={placeholder}
//                 onFocus={onFocus}
//                 onBlur={onBlur}
//                 ref={ref}
//             />
//         </div>
//     );
// };

// export default TextInput;
