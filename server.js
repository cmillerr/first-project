//express is a library built on top of node like jquery to make coding easier
//built the server by downloading express library to make building a server easier
// require is the command that tells code to retrieve the data from the folder we choose (express)
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const bcrypt = require("bcryptjs");
require('dotenv').config();

const secret = "marin smells";
const jwt = require("jsonwebtoken");

const app = express();
const path = require("path");

const connectDB = require("./DB/db.js");
const User = require("./db/User.js");

app.use(express.static(path.join(__dirname + "/")));

//function that (authorizes) checks if the url contains token (t=) and if it doesnt redirect to signup page (signuphtml)
const authCheck = async (req, res, next) => {
	const token = req.query.t;
	if (!token) {
		res.redirect("/welcome?err=Access%20denied.%20You%20must%20log%20in.");
	} else {
//decodes token (user id) and checks if the user id matches one saved in database 
	try {
		const decoded = jwt.verify(token, secret);
		const userExists = await User.findById(decoded.user.id);
//if the user id doesnt exist, send to signup page, if it does exist in data base, send to earth animation page 
		if(!userExists) {
			res.redirect("/welcome?err=Access%20denied.%20You%20must%20log%20in.");
		} else {
			console.log('Found user in DB :', userExists.id);
			next();
		}



		} catch (err) {
		console.log(err.message);
		}
	}
};


app.get("/", function (req, res) {
	console.log("here");
	res.sendFile(path.join(__dirname, "./welcome.html"));
});

app.get("/spacepic", authCheck, function (req, res) {
	console.log("here");
	res.sendFile(path.join(__dirname, "./spacePic.html"));
});

app.get("/earth", authCheck, function (req, res) {
	console.log("here");
	res.sendFile(path.join(__dirname, "./three.html"));
});

//new route when user clicks sign in button (when /signIn is found in url) it will send them the sign in file
app.get("/signIn", function (req, res) {
	console.log("here");
	res.sendFile(path.join(__dirname, "./signIn.html"));
});

//new route when user clicks sign up button (when /signup is found in url) it will send them the signup file
app.get("/signup", function (req, res) {
	console.log("here");
	res.sendFile(path.join(__dirname, "./signup.html"));
});

app.get("/welcome", function (req, res) {
	console.log("here");
	res.sendFile(path.join(__dirname, "./welcome.html"));
});


//after signup data is put in (posted), use the json library to look for json in the data
app.post("/signup", jsonParser, async function (req, res) {
	console.log("here");
	console.log(req.body);
	try {
		let newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		//sends profile back to jquery call which sends it to website
		const salt = await bcrypt.genSalt(10);
		//takes password and changes it to random characters (hash) so it cannot be stolen from hackers, databases never store real passwords
		newUser.password = await bcrypt.hash(newUser.password, salt);
		//function that saves user to database
		const createdUser = await newUser.save();
		//res.json({ id: createdUser.id });
		const payload = {
			user: {
				id: createdUser.id,
			},
		};

		jwt.sign(payload, secret, { expiresIn: 3000 }, (err, token) => {
			if (err) {
				console.log(err);
				throw err;
			} else {
				//send this encoded token back
				//encripts username
				res.json({ token: token });
				//same thing, newer, simpler syntax
				//res.json({ token });
			}
		});
	} catch (err) {
		res.status(422).json({ err: err.message });
	}

	//res.json(req.body);
});

app.post("/signIn", jsonParser, async function (req, res) {
	console.log("here");
	console.log(req.body);
	try {
		//res.json({ id: createdUser.id });
		const data = req.body;
		//checks if username exists in data base
		const userExists = await User.findOne({ email: data.email });
		//if the user doesnt exist send this message
		if (!userExists) {
			//connects to error message in ajax call
			res.status(500).json({
				message: "WRONG EMAIL DUMMY",
			});
			//if the email is a real user, compares if pw put in matches hashed pw from database
		} else {
			const pwdMatch = await bcrypt.compare(
				data.password,
				userExists.password
			);
			//if pw doesnt match, send back error message
			if (!pwdMatch)
				res.status(400).json({
					message: "WRONG PASSWORD DUMMY",
				});
			//if both pw and email match then bring back user data
			const payload = {
				user: {
					id: userExists.id,
				},
			};

		//created token and uses secret to unlock 
			jwt.sign(payload, secret, { expiresIn: 3000 }, (err, token) => {
				if (err) {
					console.log(err);
					throw err;
				} else {
					//if it goes well send this encoded token back
					//encripts username
					res.json({ token: token });
					//same thing, newer, simpler syntax
					//res.json({ token });
				}
			});
		}
	} catch (err) {
		res.status(422).json({ err: err.message });
	}

	//res.json(req.body);
});

app.listen(process.env.port || 3000, function () {
	console.log("listening!");
});
//invoked async/await function
connectDB();
