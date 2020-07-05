// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });
const bodyParser=require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//signup server
const port=8080;

const server=app.listen(port,()=>{console.log(`the server is running on port: ${port}`);});


//Get route
app.get('/all',callBack);
//CallBack function
function callBack(req,res){
    res.send(projectData);
}


//POST route
app.post('/add',addInformation);
function addInformation(req,res){
    //object to collect the information about Weather
    projectData.temperature=req.body.temperature;
    projectData.date=req.body.date;
    projectData.user_response=req.body.user_response;
    res.send(projectData);
}

