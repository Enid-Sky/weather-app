/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

let newDate = month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();


// API Key for OpenWeatherMap API

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

const country = ',US&units=imperial'


const apiKey = '&APPID=e131d5ea093dbc7fc2da1a0496c042c8';



// Event listener to add function to existing HTML DOM element on click.

document.getElementById('generate').addEventListener('click', getData);

/* Function called by event listener */

function getData(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  //callback function
  getWeatherData(baseURL, zip, country, apiKey)
    .then(function (data) {
      //post all the data
      postData('/add', {
        date: newDate,
        temp: data.main.temp,
        description: data.weather[0].description,
        feelings: feelings
      })
      updateUI('/all')
    });
  console.log(baseURL + zip + country + apiKey)
}


/* Function to GET Web API Data*/

const getWeatherData = async (baseURL, zip, country, apiKey) => {
  const res = await fetch(baseURL + zip + country + apiKey);
  try {
    //await data in JSON form
    const data = await res.json();
    //do something with data here
    return data;
  } catch (err) {
    //handle the error here
    console.error('error', err);
  }
}


/* Function to POST data */

//Make a POST request
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.error("error", err);
  }
};


/* Function to GET Project Data */

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log('all data:', allData)
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = `${allData.temp} F`;
    document.getElementById('description').innerHTML = allData.description;
    document.getElementById('content').innerHTML = allData.feelings;
  } finally {
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
  }
};