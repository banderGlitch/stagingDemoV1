import React from 'react';

const ActionTemplate = ({action}) => {
    return (
        <div>
            <h3>{action.name}</h3>
            {action.parameters.map((parameter, index) => (
                <div key={index}>
                    <label>{parameter.name}</label>
                    <input type={parameter.type} placeholder={parameter.placeholder}/>
                </div>
            ))}
        </div>
    )
}

export default ActionTemplate;
