import React from 'react';
import {Button} from 'reactstrap';

const AuthButtons = ({toggle}) => {

    return(
        <div className="auth-buttons">
            <Button outline color="primary" onClick={()=>{
                toggle('Login')
            }}>Login</Button>
            <Button outline color="secondary" onClick={()=>{
                toggle('Signup')
            }}>Singup</Button>
        </div>
    );

}

export default AuthButtons;