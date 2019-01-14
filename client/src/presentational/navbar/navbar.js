import React from 'react';
import {Navbar} from 'reactstrap';
import './navbar.css';
import AuhtModal from '../../containers/auth/auth-modal';
import UserIcon from '../user/user-icon';

const NavbarComp = ({user}) => {

    return(
        <Navbar color="dark" className="nav-wrapper" expand="md">
            <div>Logo</div>
            {(user) ? <UserIcon user={user} /> : <AuhtModal/>}
        </Navbar>
    );

};

export default NavbarComp;