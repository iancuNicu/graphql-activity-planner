import React from 'react';
import {Mutation} from 'react-apollo';
import {REMOVE_USER} from '../../local-graphql/type-defs/local-state-mutation';
import './user.css';
import Cookies from '../../cookies-config';

const UserDropdown = ({name, history}) => {

    const logout = async (removeMut) => {
        const remove = await removeMut();
        if(remove.data.removeUser.removed){
            history.push('/');
        }
        Cookies.remove('x-auth');
        Cookies.remove('x-auth-refresh');

    }

    return(
       <div className="dropdown user-dropdown">
            <button className="btn dropdown-toggle user-icon-name" type="button" id="dropdownUserButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {name ? name : 'User'}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownUserButton">
                <Mutation mutation={REMOVE_USER}>
                    {(mutation)=> {
                            return(
                                <li className="dropdown-item" onClick={() => logout(mutation)}>
                                    Logout
                                </li>
                            );
                    }}
                 </Mutation>   
            </ul>
       </div>
    );

}

export default UserDropdown;