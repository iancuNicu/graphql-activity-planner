import React from 'react';
import {GET_VENUE} from '../../queries/venue-query';
import {Query} from 'react-apollo';
import {withRouter} from 'react-router-dom';

const VenuePage = ({history}) => {
    
    return(
        <Query query={GET_VENUE} variables={{
            id: history.location.state
        }}>
            {
                ({data, loading}) => {
                    if(loading){
                        return (
                            <div>Loading...</div>
                        )
                    }
                    return(
                        <div className="container-fluid venue-page-wrapper">
                           {console.log(data)}
                           {data.getVenue.name}
                        </div>
                    );
                }
            }
        </Query>
    );
}

export default withRouter(VenuePage);