const fsquareCtrl = require('../../controllers/foursquare-controller');
const UserModel = require('../../db/models/UserModel');

const venueResolver = {
    getVenues: async ({city, section}) => {
        const venueList = await fsquareCtrl.getVenueList(city, section);
        return venueList;
    },
    getVenue : async ({id}) => {
        const venueDetails = await fsquareCtrl.getVenueDetails(id);
        return venueDetails;
    },
    getVenuePhotos: async ({id}) => {
        const venuePhotos = await fsquareCtrl.getPhotos(id);
        return venuePhotos;
    },
    bookVenue: async function({venueId}, {req}){
        const venue = await this.getVenue(venueId);
        const token = req.headers['authorization'].split(' ')[1];
        const verifyToken = UserModel.verifyToken(token);
        if(verifyToken.error){
            return verifyToken.error;
        }
        else {
            const user = await UserModel.find({_id:verifyToken._id});
            if(!user){
                throw new Error('Unauthorized!');
            }
            else {
                user.bookedList.push(venue.id.toHexString());
                return user.save().then(savedUser => {venue}).catch(e => ({
                    error:e
                }));
            }
        }
    }
}

module.exports = venueResolver;