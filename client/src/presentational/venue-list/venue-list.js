import React from 'react';
import { Query } from 'react-apollo';
import {GET_VENUES} from '../../queries/venue-query';
import VenueCard from '../venue-card/venue-card';

import './venue-list.css';

const VenueList = () => {

    return (
        <Query query={GET_VENUES} variables={{
            city:"Timisoara",
            section:"Coffee"
        }} >
            {
                ({data, loading}) => {
                    if(loading){
                        return (
                            <div>
                                Loading...
                            </div>
                        );
                    }
                    return (
                            <div className="container-fluid col-sm-7 venue-list-wrapper">
                                {data.getVenues.map(venue => (<VenueCard key={venue.name} venue={venue} />))}
                            </div>   
                        );
                }
            }
        </Query>
    );

}

export default VenueList;