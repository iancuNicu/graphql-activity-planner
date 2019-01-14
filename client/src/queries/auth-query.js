import { gql } from 'apollo-boost';

export const VERIFY_AUTH = gql`
    query($refreshToken: String!){
        verifyAuth(refreshToken: $refreshToken) {
            _id
            name
            email
        }
    }
`