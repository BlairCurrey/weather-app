# weather-app

## Purpose
The primary purpose of this web app was to learn about the backend of web development. My learning included servers, proxy-servers, databases, API's, endpoints, routes, environment variables, and :fire: CORS errors :fire:. I also learned more about ES6 Javascript. My eventual goal was to leverage aspects of this project to make a different web app, which I have done here. https://github.com/BlairCurrey/commute-dashboard This is a simple site that pulls in relevant information for commuting (weather, train times).

## Description
This is a simple web application that gets two sets of coordinates from the user (either manually or from geolocation) and sends them to an endpoint on the server. The server makes API calls to Darksky for each coordinate and returns the response to the client. Then the client grabs the temperatures, renders them, and sends the coordinate pairs and their temperature back to the server where it is saved to the database. Additionally, the user can query the database from the database page. The 'Get Data' button makes a request to the server which finds all the items in the database, sorts them by date, and then returns the 30 most recent entries. The client builds a table according to how many entries are returned.

## Demo
![Index Demo](https://i.imgur.com/GKUyVJJ.gif)
![Database Demo](https://i.imgur.com/LRtY8vD.gif)

## Technologies Utilized
- Express.js
- Node.js
- NeDB
- dotenv

## Notes
The included .env_example file will need to edited to include a real darksky API key and the file name changed to '.env'. Unfortunatley it appears they have been aqcuired by Apple and are no longer accepting new users. 

I have left comments and alternative syntax for some bits of code for my future reference.
