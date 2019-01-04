const authResolver = require('./auth-resolver');
const venueResolver = require('./venue-resolver');

const rootResolver = {
    ...authResolver,
    ...venueResolver
}

module.exports = rootResolver;