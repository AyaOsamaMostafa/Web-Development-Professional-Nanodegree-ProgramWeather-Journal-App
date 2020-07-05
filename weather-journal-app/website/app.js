/* Global Variables */


// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='&APPID=e91c22f2f6ce5e73fbb6212b75c6dc30';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add Event Listener
document.getElementById('generate').addEventListener('click',performAction);
//CallBack Function of Event Listener
function performAction(event){
    const newZip =document.getElementById('zip').value;
    const feeling=document.getElementById('feelings').value;

getZip(baseURL,newZip,apiKey)
 .then(function(data){
    console.log("temp data",data.main.temp);
    postData('http://localhost:8080/add',{ temperature:data.main.temp,date:newDate,user_response: feeling})
    .then (function(){
        updataUI();
    })

})
}

//Function to Get web API Data
const getZip=async (baseURL,code,Key)=>{
    const res=await fetch(baseURL+code+Key);
    try{
 
        const promise = await res.json();
        return promise ;
    }
    catch(error){
        console.log('error',error);
    }
};
// fuction to POST data
const postData=async (url='',data={})=>{
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    })
    try{
        const newData=await response.json();
        console.log("new data",newData);
        return newData;
    }
    catch(error){
        console.log('error',error);
    }
    
};
// Updata UI Data
const updataUI=async(url='')=>{
    const request=await fetch('http://localhost:8080/all');
    try{
        const allData=await request.json();
        document.getElementById('date').innerHTML=allData.date;
        document.getElementById('temp').innerHTML=allData.temperature;
        document.getElementById('content').innerHTML=allData.user_response;
        
    }
    catch(error){
        console.log('error',error);
    }
};
