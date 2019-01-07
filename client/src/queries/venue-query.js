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
            icon {
                prefix
                suffix
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
        }
    }
`