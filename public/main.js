//Get Geolocation Button
const buttonGetGeolocation = document.getElementById('get-geolocation');
buttonGetGeolocation.addEventListener('click', getGeolocation);

function getGeolocation() {
  if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(position => {
      document.getElementById('start-lat-text').textContent = position.coords.latitude.toFixed(4)
      document.getElementById('start-lon-text').textContent = position.coords.longitude.toFixed(4)
    });
  } else {
    console.log("Geolocations is NOT available");
  }
}

// Start Button
const buttonStart = document.getElementById('start-set-location');
buttonStart.addEventListener('click', setStartLocation);

function setStartLocation() {
  document.getElementById('start-lat-text').textContent = Number(document.getElementById("start-latitude-input").value).toFixed(4)
  document.getElementById('start-lon-text').textContent = Number(document.getElementById("start-longitude-input").value).toFixed(4)
}

// End Button
const buttonEnd = document.getElementById('end-set-location');
buttonEnd.addEventListener('click', setEndLocation);

function setEndLocation() {
  document.getElementById('end-lat-text').textContent = Number(document.getElementById("end-latitude-input").value).toFixed(4)
  document.getElementById('end-lon-text').textContent = Number(document.getElementById("end-longitude-input").value).toFixed(4)
}

//Get Weather Button
const buttonGetWeather = document.getElementById('get-weather');
buttonGetWeather.addEventListener('click', getWeather);

function getCoordsFromHTML(){
  let start = {};
  let end = {};
  start.lat = document.getElementById('start-lat-text').textContent;
  start.lon = document.getElementById('start-lon-text').textContent;
  end.lat = document.getElementById('end-lat-text').textContent;
  end.lon = document.getElementById('end-lon-text').textContent;
  console.log(start, end)
  return {start, end}
}

// Post to our server database endpoint
async function postData(start_lat, start_lon, start_temp, end_lat, end_lon, end_temp) {
  const data = { start_lat, start_lon, start_temp, end_lat, end_lon, end_temp };
  const options = {
            method: 'Post',
            headers: {
              'Content-Type': 'application/json'    
            },
            body: JSON.stringify(data)
  };
  
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log("Returned from post: \n", json);
  
};

//send to our server weather endpoint
async function getWeather() {
  let coords = getCoordsFromHTML()
  console.log(`Sending locations to the server`)
  let url = `/weather/${coords.start.lat}/${coords.start.lon}/${coords.end.lat}/${coords.end.lon}`;
  const response = await fetch(url);
  const json = await response.json();
  console.log("Data returned from weather API:\n", json);
  const start_temp = json.start.currently.temperature
  const end_temp = json.end.currently.temperature
  document.getElementById('start-temp').textContent = start_temp
  document.getElementById('end-temp').textContent = end_temp
  postData(coords.start.lat, coords.start.lon, start_temp, coords.end.lat, coords.end.lon, end_temp);
};

// setInterval shouldn't actually be used but here is an example
// setInterval(function() { getWeather(lat, lon); }, 5000)

///////////////////////////////////////////
// async / await method with error catching
// postData must be async function
// https://javascript.info/async-await
///////////////////////////////////////////
// try {
//   const response = await fetch('/api', options);
//   const json = await response.json();
//   console.log(json);
// } catch(err) {
//   console.error(err);
// }

///////////////////////////////////////////////////////
//alternative method - postData() must not be async
///////////////////////////////////////////////////////
// fetch('/api', options)
//   .then(response => {
//     console.log(response)
//     return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.error(err)
//   });