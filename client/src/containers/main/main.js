import React, {Component} from 'react';
import Navbar from '../../presentational/navbar/navbar';
import {Switch, withRouter} from 'react-router-dom';
import withAuth from '../../hoc/withAuth';

import routes from '../../routes/routes';

class Main extends Component {

    switchInitRoute = () => {
        const {location, user} = this.props;
        if(location.pathname === '/' && !user){
            this.props.history.push('/venue-list');    
        }
        else if(location.pathname === '/' && user){
            this.props.history.push('/user-page');
        }
    }

    componentDidMount(){
        this.switchInitRoute();
        const {StoreMutation, authData} = this.props;
        if(authData){
            StoreMutation(authData);
        }
    }


    render(){ 
        return(
            <React.Fragment>
                <Navbar user={this.props.authData} />
                <Switch>
                    {routes}
                </Switch>
            </React.Fragment>
        );
    };

}

export default withAuth(withRouter(Main));