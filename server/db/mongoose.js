const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/graphqlActivity',
     {useNewUrlParser: true, useCreateIndex: true,});

module.exports = {mongoose};