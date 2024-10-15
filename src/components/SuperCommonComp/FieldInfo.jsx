import React from 'react';

const FieldInfo = ({ fieldInfo }) => {
    // Render the info if fieldInfo is provided
    return (
        <span style={{ marginLeft: '10px', color: 'gray' }}>
            {fieldInfo}
        </span>
    );
};

export default FieldInfo;

// import React from 'react';

// const FieldInfo = ({ focusedField, fieldName, fieldInfo }) => {
//     // Only render the info if the current field is focused
//     if (focusedField === fieldName) {
//         return (
//             <span style={{ marginLeft: '10px', color: 'gray' }}>
//                 {fieldInfo}
//             </span>
//         );
//     }
//     return null;
// };

// export default FieldInfo;