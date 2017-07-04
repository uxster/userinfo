/*
Create a Node.js application that is the beginning of a user management system. 
Your users are all saved in a "users.json" file, and you can currently do the following:
- search for users
- add new users to your users file.

Create one route:
- route 1: renders a page that displays all your users.
*/

const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.send('Hello World!')
}); 

app.get('/users', function(req, res) {
	res.send(x)
}); 

app.post('/users/new', function(req, res) {
	res.send(x)
});

app.listen(3000, function() {
	console.log("Listening on port 3000!")
});