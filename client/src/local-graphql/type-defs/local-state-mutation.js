import { gql } from 'apollo-boost';

export const ADD_USER = gql`
    mutation($user: UserInput){
        addUser(user: $user) @client{
            email
            _id
            name
        } 
    }
`;

export const REMOVE_USER = gql`
    mutation {
        removeUser @client {
            removed
            error
        }
    }
`