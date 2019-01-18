import React from 'react';
import { compose, graphql } from 'react-apollo';
import { GET_VENUE, GET_VENUE_PHOTOS } from '../../queries/venue-query';
import VenuePage from './venue-page';

const VenuePageWrapper = (props) => {

    const getVenue = graphql(GET_VENUE, {
        name:'venueQuery',
        options: {
            variables: {
                id: props.location.state
            }
        }
    });

    const getPhotos = graphql(GET_VENUE_PHOTOS, {
        name: 'photosQuery',
        options: {
            variables: {
                id: props.location.state
            }
        }
    });

    const VenuePageComp = compose(getPhotos, getVenue)(VenuePage);
    
    return(
        <React.Fragment>
              <VenuePageComp />  
        </React.Fragment>
    );

}

export default VenuePageWrapper;
