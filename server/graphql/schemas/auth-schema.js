const {buildSchema} = require('graphql');

const authSchema = buildSchema(`

    type User {
        _id:String!
        email:String!
        refreshToken:String!
        name:String
    }

    input UserInput {
        email:String!
        password:String!
        name:String
    }

    type Query {
        login(user:UserInput): User
    }

    type Mutation {
        signup(user:UserInput): User
    }

    schema {
        query: Query
        mutation: Mutation
    }

`);

module.exports = authSchema;