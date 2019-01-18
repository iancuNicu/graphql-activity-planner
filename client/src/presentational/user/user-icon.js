import React from 'react';
import {TiUserOutline} from 'react-icons/ti';
import UserDropdown from './user-dropdown';
import './user.css';

const UserIcon = ({user, history}) => {
    return(
        <div className="container-fluid user-icon">
            <TiUserOutline size="24" />
            <UserDropdown name={user.name} history={history} />
        </div>
    )
}

export default UserIcon;