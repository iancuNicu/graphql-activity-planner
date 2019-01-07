import React, {Component} from 'react';
import Navbar from '../presentational/navbar/navbar';
import {Switch} from 'react-router-dom';
import {withCookies} from 'react-cookie';

import routes from '../routes/routes';

class Main extends Component {

    render(){
        const {user} = this.props;
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

export default withCookies(Main);