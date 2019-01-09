import React, {Component} from 'react';
import Navbar from '../../presentational/navbar/navbar';
import {Switch, withRouter} from 'react-router-dom';

import routes from '../../routes/routes';

class Main extends Component {

    switchInitRoute = () => {
        const {location, user} = this.props;
        if(location.pathname === '/' && !user){
            this.props.history.push('/venue-list');    
        }
        else if(location.pathname === '/' && user){
            this.props.history.push('/user-main');
        }
    }

    componentDidMount(){
        this.switchInitRoute();
    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
                <Switch>
                    {routes}
                </Switch>
            </React.Fragment>
        );
    };

}

export default withRouter(Main);