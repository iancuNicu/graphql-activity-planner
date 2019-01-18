import React from 'react';
import {Navbar} from 'reactstrap';
import './navbar.css';
import AuhtModal from '../../containers/auth/auth-modal';
import UserIcon from '../user/user-icon';
import {withRouter} from 'react-router-dom';

const NavbarComp = ({user, history}) => {

    return(
        <Navbar color="dark" className="nav-wrapper" expand="md">
            <div>Logo</div>
            {(user) ? <UserIcon history={history} user={user} /> : <AuhtModal history={history} />}
        </Navbar>
    );

};

export default withRouter(NavbarComp);