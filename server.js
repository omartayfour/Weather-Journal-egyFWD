// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

// GET ROUTE
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};


// POST ROUTE
app.post('/add', addData);

function addData (request, response){
    let newEntry = {
        temp: request.body.temp,
        country: request.body.country,
        state: request.body.state,
        date: request.body.date,
        feelings: request.body.feelings
    }
    projectData = newEntry;
};