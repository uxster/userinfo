/*
Hester van Slooten

Create a Node.js application that is the beginning of a user management system. 
Your users are all saved in a "users.json" file.

Create routes:
- route 1: renders a page that displays all your users.
- route 2: renders a page that displays a form which is your 
search bar.
- route 3: takes in the post request from your form, then 
displays matching users on a new page. Users should be matched 
based on whether either their first or last name contains the 
input string.
- route 4: renders a page with three forms on it (first name, 
last name, and email) that allows you to add new users to the 
users.json file.
- route 5: takes in the post request from the 'create user' form, 
then adds the user to the users.json file. Once that is complete, 
redirects to the route that displays all your users (from part 0).
*/

//setting up dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

//setting up pug as the view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//linking to the css file (which is static)
app.use(express.static(__dirname + '/../public'));
//starting bodyparser
app.use('/', bodyParser.urlencoded({ extended: true }));


//ROUTES
//get request for the home/index route
app.get('/', function(req, res) {
	res.render('index');
});

//get request for the /users route, which will show a list of all the users
app.get('/users', function(req, res) {
	//reading the JSON-file
	fs.readFile(__dirname + '/../resources/users.json', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
		}

		//creating an object with the parsed data
		var obj = JSON.parse(data);

		//render the users.pug file on this route and send along the parsed data
		res.render('users', {
			users: obj
		});
	});
});

//get request for the /new route, which will show a form for making new users
app.get('/new', function(req, res) {
	//render the new.pug file
	res.render('new');
});

//get request for the /result route, which will show the search results from the form on the home/index route
app.get('/result', function(req, res) {
	//render the result.pug file
	res.render('result');
});

//POST REQUESTS

//post request for the /users route
app.post('/users', function(req, res) {
	//req.body returns a js object with data from the request, stored in a variable
	var newData = req.body; 

	//function to read the users.json file
	fs.readFile(__dirname + '/../resources/users.json', 'utf8', function(err, data) {
		if (err) {
			throw err;
		}

		//storing parsed json-data in a variable called obj
		var obj = JSON.parse(data);

		//push the new user-data into array in obj
		obj.push(newData);

		//function to write a stringified version of the new obj into the json file
		fs.writeFile(__dirname + '/../resources/users.json', JSON.stringify(obj), 'utf8', function(err) {});
	});

	//redirect to the /users route
	res.redirect('/users');
});

//post request for the /result route
app.post('/result', function(req, res) {
	//store the data from the req.body (formname = search) in a variable called searchquery
	var searchquery = req.body.search;

	//function to read the users.json file
	fs.readFile(__dirname + '/../resources/users.json', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
		}

		//storing parsed json-data in a variable called obj
		var obj = JSON.parse(data);

		//loop through the array of objects in obj
		for (var i = 0; i < obj.length; i++) {
			//check if the searchquery equals any firstname or lastname value in obj
			if ((searchquery === obj[i].firstname) || (searchquery === obj[i].lastname)) {
				//if true, assign the correct object to the result-variable
				var result = obj[i];
			} 
		};
		
		//render the result.pug file and send along the data stored in the result-variable
		res.render('result', {
			result: result,
		});
	});
});

//start listening to port 3000 and log it to check if it's working
var server = app.listen(3000, function() {
	console.log('Example app listening on port: ' + server.address().port);
	console.log(__dirname);
});





/*The GET method should only be used for forms that don't change 
user data (e.g. a search form). It is recommended for when you 
want to be able to bookmark or share the URL.
var requestMethod = req.method;
var requestUrl = req.url;*/

//note to self:
// var newDataFirstname = req.body.firstname;
// var newDataLastname = req.body.lastname;
// var newDataEmail = req.body.email;
