/*
Create a Node.js application that is the beginning of a user management system. 
Your users are all saved in a "users.json" file, and you can currently do the following:
- search for users
- add new users to your users file.

Create one route:
- route 1: renders a page that displays all your users.

Create more routes:
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

//setting up pug
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//linking to the css file (which is static)
app.use(express.static(__dirname + '/../public'));
//starting bodyparser
app.use('/', bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/users', function (req, res) {
	fs.readFile(__dirname + '/../resources/users.json', 'utf8', function (err, data) {
		var obj = {};

		if (err) {
			console.log(err);
		}

		obj = JSON.parse(data);

		res.render('users', {
			users: obj
		});
	});
});

app.get('/new', function (req, res) {
	res.render('new');
});

app.get('/search', function (req, res) {
	res.render('search');
});

app.post('/users', function (req, res) {
	var newData = req.body;
	// var newDataFirstname = req.body.firstname;
	// var newDataLastname = req.body.lastname;
	// var newDataEmail = req.body.email;

	console.log('recieved post: ' + newData)
	fs.readFile(__dirname + '/../resources/users.json', 'utf8', function(err, data) {
		// console.log('newData: ' + newData)
		var obj = {};

		if(err) {
			throw err;    
		}

		obj = JSON.parse(data);

		obj.push(newData);

		// console.log('read done: ' + data)
		// console.log('parsed: ' + obj)

		// console.log(JSON.stringify(obj))

		fs.writeFile(__dirname + '/../resources/users.json', obj, 'utf8', function(err) {
		});
	});

	res.redirect('/users');
});

var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});