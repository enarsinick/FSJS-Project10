'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models'); 
const userRoute = require('./routes/user');
const courseRoute = require('./routes/course');
const bodyParser = require('body-parser');
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Enable all CORS requests
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// for parsing application/jsons
app.use(express.json()) 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// TODO setup your api routes here
app.use('/api', userRoute);
app.use('/api', courseRoute);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// async IIFE
(async () => {
  try {
    // Test connection to the database
    await sequelize.authenticate();
    console.log('Connection to database successful');
  } catch(err) {
    console.log('Error connecting to the database', err);
  }
})();

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {err},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
sequelize.sync().then(() => {
  const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  });
})

