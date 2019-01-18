import React from 'react';
import Carousel from '../../containers/carousel/carousel';

import './venue-page.css';

const VenuePage = ({venueQuery, photosQuery}) => {

    if(!(venueQuery.loading && photosQuery.loading)){
        console.log(venueQuery.getVenue, photosQuery.getVenuePhotos);
    }
   
    return (
        <React.Fragment>
            {
                (
                    (venueQuery.loading && photosQuery.loading) ?

                        <div>Loading...</div> :

                        <div className="container-fluid venue-page">
                        {
                           venueQuery.getVenue ? 
                           <section className="venue-information-container">
                                <div className="venue-icon">Icon</div>
                                <div className="venue-details">
                                    <p>
                                        {venueQuery.getVenue.name}
                                    </p>
                                    <p>
                                        {venueQuery.getVenue.location.address}
                                    </p>
                                    <p>
                                        {venueQuery.getVenue.location.city}
                                    </p>
                                </div>
                                <div className="venue-rating-url">
                                    {venueQuery.getVenue.rating}
                                </div>
                            </section> : 
                            undefined 
                        }
                            {
                                photosQuery.getVenuePhotos ?
                                <section>
                                    <Carousel photos={photosQuery.getVenuePhotos} />
                                </section> :
                                undefined
                            }
                        </div>
                )
            }
        </React.Fragment>
    );
}

export default VenuePage;