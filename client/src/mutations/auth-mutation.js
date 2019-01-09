import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation($user: UserInput){
        login(user: $user){
            email
            name
        }
    }
`
export const SIGNUP = gql`
    mutation($user: UserInput){
        signup(user: $user){
            email
            name
        }
    }
`