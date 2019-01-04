const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const express_graphql = require('express-graphql');
const cors = require('cors');
const rootResolver = require('./graphql/resolvers/rootResolver');
const rootSchema = require('./graphql/schemas/rootSchema');
const authMiddl = require('./middleware/auth-middleware');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authMiddl); 

app.use('/graphql',
        express_graphql((req, res) => ({
          schema: rootSchema,
          rootValue: rootResolver,
          context: {
            req,
            res
          },
          graphiql:true
        })),
 );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
