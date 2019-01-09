import React from 'react';

const Input = ({inputData, handleChange, stateValue}) => {
    
    const {label, name, type} = inputData;

    return(
        <React.Fragment>
            { label ? 
                <label htmlFor={name}>
                    {label}
                </label> :
              undefined  
            }
            <input className="form-control"
                   id={name}
                   value={type==='file'?undefined:stateValue}
                   type={type}
                   name={name} 
                   onChange={handleChange} />
        </React.Fragment>
    );
}

export default Input;