import React from 'react';
import Input from '../form-fields/input';

const AuthBody = ({handleChange, state}) => {

    return(
        <div className="form-group">
                            <Input key={'email'}
                                inputData={{
                                    label: "email",
                                    name: "email",
                                    type: "email"
                                }}
                                handleChange={handleChange}
                                stateValue={state.email}
                            />
                            <Input key={'password'} 
                                inputData={{
                                    label: "password",
                                    name: "password",
                                    type: "password"
                                }}
                                handleChange={handleChange}
                                stateValue={state.password}
                            />
                        </div>
    );

}

export default AuthBody;