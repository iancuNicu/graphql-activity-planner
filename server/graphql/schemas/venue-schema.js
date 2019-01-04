const { buildSchema } = require('graphql');

const venueSchema = buildSchema(`

    type Location {
        address: String
        crossStreet: String
        city: String
        state: String
    }
    
    type Venue {
        id:ID!
        name:String
        contact:String
        location: Location
        categories: [String]
    }

    type Query {
        getVenues: [Venue]
        getVenue(id: ID!): Venue
    }

    type Mutation {
        bookVenue(id: ID!): Venue
    }

    schema {
        query: Query
        mutation: Mutation
    }

`);

module.exports = venueSchema;
