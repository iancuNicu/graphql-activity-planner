import { gql } from 'apollo-boost';

export const GET_VENUES = gql`
    query($city: String, $section: String) {
        getVenues(city: $city, section: $section){
            id
            name 
            location {
              address
              city
            }
          }
    }
`;

export const GET_VENUE = gql`
    query($id: String!) {
        getVenue(id: $id){
            id
            name
            location {
               address
               city
            }
            bestPhoto {
                suffix
                prefix
                width
                height
            }
            url
            rating
            ratingColor
            hours {
                status
                isOpen
            }
        }
    }
`;

export const GET_VENUE_PHOTOS = gql`
    query($id: String!) {
        getVenuePhotos(id: $id){
            prefix
            suffix
            width
            height
        }
    }
`;