import React from 'react';
import {TiUserOutline} from 'react-icons/ti';
import './user.css';

const UserIcon = ({user}) => {
    console.log('User icon ', user);
    return(
        <div className="container-fluid user-icon">
            <TiUserOutline size="24" />
            <p className="user-icon-name">{user.name ? user.name : 'User'}</p>
        </div>
    )
}

export default UserIcon;