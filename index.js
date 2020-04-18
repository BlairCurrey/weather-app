const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

//Server
const app = express();
const port = 3000 || process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}`));

//Middleware
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

//Database
let options = {
  filename: 'location.db', 
  // autoload: true,
  timestampData: true
};
const db = new Datastore(options);
db.loadDatabase();

//sort
app.get('/api', (request, response) => {
  db.find({})
    .sort({ createdAt: -1 })
    .limit(30)
    .exec(function (err, docs) {
      if (err) {
        response.end();
        console.log(err)
        return;
      }
      // console.log(docs)
      response.json(docs)
  })
});

app.post('/api', (request, response) => {
  //Get what we need from the request
  const data = request.body;

  //Process what we got from the request
  console.log('/api endpoint received:\n', data);
  db.insert(data)

  //Respond to client
  response.json("Data received by server")
});

//proxy server for darksky.net using route parameters for lat/lon
//could replace fetch with https - https://www.valentinog.com/blog/http-js/
//could use query strings instead of route parameters
app.get('/weather/:start_lat/:start_lon/:end_lat/:end_lon', async (request, response) => {
  const start_lat = request.params.start_lat;
  const start_lon = request.params.start_lon;
  const end_lat = request.params.end_lat;
  const end_lon = request.params.end_lon;
  const ds_api_key = process.env.DARKSKY_KEY
  
  const start_url = `https://api.darksky.net/forecast/${ds_api_key}/${start_lat},${start_lon}`
  const start_response = await fetch(start_url);
  const start_json = await start_response.json();
  
  const end_url = `https://api.darksky.net/forecast/${ds_api_key}/${end_lat},${end_lon}`
  const end_response = await fetch(end_url);
  const end_json = await end_response.json();
  
  const data = {
    start: start_json,
    end: end_json
  }
  response.json(data)

});
