const UserModel = require('../db/models/UserModel');
global.Headers = require('node-fetch').Headers;

const isTokenEpired = (token, isJwt) => {
    const verify = UserModel.verifyJwt(token, isJwt);
    if(verify.error){
        return {
            isExpired:true
        }
    }
    else {
        const dateNow =  Date.now().valueOf() / 1000;
        if(typeof verify.exp !== 'undefined' && verify.exp < dateNow){
            return {
                _id: verify._id,
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
    const token = req.headers['authorization'];
    const refToken = req.body.variables.refreshToken;
    if(!res.headers){
        res.headers = new Headers();
    }
    if(token && refToken){
        const tokenVerify = isTokenEpired(token, true);
        if(tokenVerify.isExpired){
            const refVerify = isTokenEpired(refToken, false);
            const user = await UserModel.findOne({_id:refVerify._id});
            if(!user){
                throw new Error('Unauthorized! No user found!');
            }
            if(user.refreshToken !== refToken){
                throw new Error('Invalid auth tokens!');
            }
            if(refVerify.isExpired){
                    throw new Error('Bad auth!');
            }
            else {
               const token = user.genJwtToken();
               req.headers['authorization'] = `${token}`;
               res.set('authorization' ,`${token}`);
               next();
            }
        }
        else 
            next();
    }
    else
        next();
}