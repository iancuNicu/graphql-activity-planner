
export const lStateTypeDefs = `
    input UserInput {
        _id: String
        name: String
        email: String!
    }

    type User {
        _id: String
        name: String
        email: String!
    }

    type Mutation {
        addUser(user: UserInput): User 
    }
`;