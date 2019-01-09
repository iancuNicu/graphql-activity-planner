const {buildSchema} = require('graphql');

const authSchema = buildSchema(`

    type User {
        _id:String!
        email:String!
        name:String
    }

    input UserInput {
        email:String!
        password:String!
        name:String
    }
    
    type Query {
        getUser: String
    }

    type Mutation {
        login(user:UserInput): User
        signup(user:UserInput): User
    }

    schema {
        query: Query
        mutation: Mutation
    }

`);

module.exports = authSchema;