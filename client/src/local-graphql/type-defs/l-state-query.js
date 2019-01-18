import {gql} from 'apollo-boost';

export const L_USER_QUERY = gql`
    query {
        user @client {
            email
            _id
            name
        }
    }
`