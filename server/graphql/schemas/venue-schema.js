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

    type VenuePhoto {
        id: String
        createdAt: Int
        prefix: String
        suffix: String
        width: Int
        height: Int
    }
    
    type Venue {
        id:ID!
        name:String
        location: Location
        contact: VenueContact
        url: String
        rating: Float
        ratingColor: String
        hours: VenueHours,
        bestPhoto: VenuePhoto
    }

    type Query {
        getVenues(city:String, section:String): [Venue]
        getVenue(id: String!): Venue
        getVenuePhotos(id: String!): [VenuePhoto]
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
