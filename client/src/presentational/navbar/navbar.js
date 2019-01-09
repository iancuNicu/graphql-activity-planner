import React from 'react';
import {Navbar} from 'reactstrap';
import './navbar.css';
import AuhtModal from '../../containers/auth/auth-modal';

const NavbarComp = ({user}) => {

    return(
        <Navbar color="dark" className="nav-wrapper" expand="md">
            <div>Logo</div>
            <AuhtModal/>
        </Navbar>
    );

};

export default NavbarComp;