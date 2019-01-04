const UserModel = require('../db/models/UserModel');
global.Headers = require('node-fetch').Headers;

const isTokenEpired = (token) => {
    const verify = UserModel.verifyJwt(token);
    if(verify.error){
        return {
            isExpired:true
        }
    }
    else {
        const dateNow =  Date.now().valueOf() / 1000;
        if(typeof verify.exp !== 'undefined' && verify.exp < dateNow){
            return {
                isExpired:true
            }
        }
        else {
            return {
                isExpired:false,
                _id:verify._id
            }
        }
    }
}

module.exports = async (req, res, next) => {
    const token = req.headers['Authorization'];
    const refToken = req.body.refreshToken;
    if(!res.headers){
        res.headers = new Headers();
    }
    if(token && refToken){
        const tokenVerify = isTokenEpired(token);
        if(tokenVerify.isExpired){
            const refVerify = isTokenEpired(refToken);
            if(refVerify.isExpired){
                throw new Error('Bad Auth!');  
            }
            else {
                const user = await UserModel.find({_id:refVerify._id});
                if(!user){
                    throw new Error('Unauthorized! No user found!');
                }
                else {
                    const token = user.genJwtToken();
                    req.headers['Authorization'] = `Bearer ${token}`;
                    next();
                }
            }
        }
        else 
            next();
    }
    else
        next();
}