
const AuthController = {
    genAuthOutput: async (user) => {
        const token = user.genJwtToken();
        const newUser = await user.genRefreshToken();
        newUser._doc._id = newUser._doc._id.toString();
        if(newUser.error){
            throw newUser.error
        }
        else {
            return {
                user:{...newUser._doc},
                token
            }
        }
    }
}

module.exports = AuthController;