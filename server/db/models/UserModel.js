const {mongoose} = require('../mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSalt = process.env.JWT_SALT;
const refSalt = process.env.REF_SALT;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} nu este un email valid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    bookedList: {
        type:Array,
        minlength: 0,
        maxlength: 10,
    },
    refreshToken: {
        type: String,
        required: false,
        minlength: 6
    }
});

UserSchema.methods.genJwtToken = function(){
    const user = this;
    return jwt.sign({_id: user._id.toHexString()}, jwtSalt, { expiresIn: 300 });
}

UserSchema.static.verifyJwt = function(token){
    try {
        const decodeToken = jwt.verify(token, jwtSalt);
        return {
            _id: decodeToken._id
        }
    }
    catch(e){
        return {
            error:e
        }
    }
}

UserSchema.methods.genRefreshToken = function(){
    const user = this;
    const refreshToken = jwt.sign({_id: user._id.toHexString()}, refSalt, { expiresIn: '7d' } );
    user.refreshToken = refreshToken;
    return user.save().then(newUser => newUser).catch(e => ({
        error:e
    }));
}

UserSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (e, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
  
    return _.pick(userObject, ['_id' ,'email', 'refreshToken']);
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;