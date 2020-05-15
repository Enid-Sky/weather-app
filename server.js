// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


let url = `http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=imperial&APPID=e131d5ea093dbc7fc2da1a0496c042c8`;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


/*Dynamic Port*/
// Setup Server
const port = process.env.PORT || 3000;

//spin up the server
app.listen(port, () => console.log(`Listening on port: ${port}`));