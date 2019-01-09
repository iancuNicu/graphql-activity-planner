const UserModel = require('../../db/models/UserModel');
const authCtrl = require('../../controllers/auth-controller');
const bcrypt = require('bcryptjs');

module.exports = {
    getUser: () => {
        // dummy query so that the root query is defined
        return 'User';
    },
    login: async ({user}, {res}) => {
        if(user.email && user.password){
            const foundUser = await UserModel.findOne({email:user.email});
            if(!foundUser){
                throw new Error('Inexistent user!');
            }
            else {
                const isPass = await bcrypt.compare(user.password, foundUser.password);
                if(!isPass){
                    throw new Error("Wrong password!");
                }
                else {
                    const user = await authCtrl.genAuthOutput(foundUser);
                    res.set('x-auth', `Bearer ${authData.token}`);
                    res.set('x-auth-refresh', `${authData.refreshToken}`)
                    return authData.user;
                }
            }
        }
        else
            return null;
    },
    signup: async ({user}, {res}) => {
        if(user.email && user.password){
           const findUser = await UserModel.findOne({email:user.email});
           if(findUser){
            const authData = await authCtrl.genAuthOutput(findUser);
            res.set('x-auth', `Bearer ${authData.token}`);
            res.set('x-auth-refresh', `${authData.refreshToken}`)
            return authData.user;
           }
           else {
            let newUser = new UserModel({...user});
            const authData = await authCtrl.genAuthOutput(newUser);
            res.set('x-auth', `Bearer ${authData.token}`);
            res.set('x-auth-refresh', `${authData.refreshToken}`)
            return authData.user;
           }
        }
        else
            return null;
    }
}