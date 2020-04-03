# weather-app

## Purpose
The primary purpose of this web app is to learn about the backend of web development. My learning included servers, proxy-servers, databases, API's, endpoints, routes, environment variables, and :fire: CORS errors :fire:. I also learned more about javascript syntax involved with callback functions and arrow  function notation. My eventual goal is to leverage aspects of this project to make a simple dashboard of useful commuting info for reference in the morning while getting ready for work (hence the 'start' and 'end' designations for the two locations). The general plan is to display the weather at home, the expected commute duration, the weather at work at the expected arrival, and relevant train status and arrival times.

## Description
This is a simple web application that gets two sets of coordinates from the user (either manually or from geolocation) and sends them to an endpoint on the server. The server makes API calls to Darksky for each coordinate and returns the response to the client. Then the client grabs the temperatures, renders them, and sends the coordinate pairs and their temperature back to the server where it is saved to the database. Additionally, the user can query the database from the database page. The 'Get Data' button makes a request to the server which finds all the items in the database, sorts them by date, and then returns the 30 most recent entries. The client builds a table according to how many entries are returned.

## Technologies Utilized
- Express.js
- Node.js
- NeDB
- dotenv

## Notes
The included .env_example file will need to edited to include a real darksky API key and the file name changed to '.env'. Unfortunatley it appears they have been aqcuired by Apple and are no longer accepting new users. 

I have left comments and alternative syntax for some bits of code for my future reference.