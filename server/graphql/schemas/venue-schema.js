const { buildSchema } = require('graphql');

const venueSchema = buildSchema(`

    type Location {
        address: String
        crossStreet: String
        city: String
        state: String
        formattedAddress: [String]
    }

    type VenueContact {
        phone: String
        formattedPhone: String
        facebook: String
        facebookUsername: String
        facebookName: String
    }

    type VenueHours {
        status: String
        isOpen: Boolean
    }

    type BestPhoto {
        id: String
        prefix: String
        suffix: String
        width: Int
        height: Int
    }
    
    type Venue {
        id:ID!
        name:String
        contact:String
        location: Location
        contact: VenueContact
        url: String
        rating: Float
        ratingColor: String
        hours: VenueHours,
        bestPhoto: BestPhoto
    }

    type Query {
        getVenues(city:String, section:String): [Venue]
        getVenue(id: String!): Venue
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
