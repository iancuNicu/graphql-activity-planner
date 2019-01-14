import { gql } from 'apollo-boost';

export const L_STATE_MUTATION = gql`
    mutation($user: UserInput){
        addUser(user: $user) @client{
            email
            _id
            name
        }   
    }
`;