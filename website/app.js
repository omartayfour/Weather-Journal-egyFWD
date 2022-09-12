/* Global Variables */
const API_KEY = '&appid=a59d29af0fd91b820f69594d1063249d&units=imperial'; // &APPID=a59d29af0fd91b820f69594d1063249d
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// event listener
generate.addEventListener('click', () => {
    if (zip.value.trim() === '' || feelings.value.trim() === '')
    {
        alert('empty fields!!');
    } 
    else{
        getWeather(BASE_URL,zip.value,API_KEY)
        .then((data)=>{
            postData({
                date: newDate,
                temp: data.main.temp,
                feelings: feelings.value
            })
        }).then(()=>updateUI())
    }
});

// get weather
async function getWeather(baseURL, zipCode, apiKey) {
    const getRequest = await fetch(baseURL + zipCode + apiKey);
    try {
        const data = await getRequest.json();
        return data
    }
    catch (error) {
        console.log(error.message);
    }
}

// send data to server 
async function postData(data = {}) {
    const response = await fetch('http://localhost:4000/add', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

// update UI
async function updateUI() {
    const getRequest = await fetch('http://localhost:4000/all');
    try {
        const data = await getRequest.json()
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = Math.round(data.temp) + ' degrees';
        document.getElementById('content').innerHTML = data.feelings;
    }
    catch (error) {
        console.log(error.message);
    }
}