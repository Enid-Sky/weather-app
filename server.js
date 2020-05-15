// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

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


//GET route
app.get('/all', function (req, res) {
  res.status(200);
  res.send(projectData);
});


//POST route
app.post('add/', function (req, res) {
  let newData = req.body;
  projectData['date'] = newData.date;
  projectData['temp'] = newData.temp;
  projectData['zip'] = newData.zip;
  projectData['feelings'] = newData.feelings;
  res.status(200);
  res.send(projectData);
});