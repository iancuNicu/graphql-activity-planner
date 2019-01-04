const {mergeSchemas} = require('graphql-tools');

const authSchema = require('./auth-schema');
const venueSchema = require('./venue-schema');

const rootSchema = mergeSchemas({
    schemas: [
        authSchema,
        venueSchema
    ]
});

module.exports = rootSchema;


