//express is a library built on top of node like jquery to make coding easier 
//built the server by downloading express library to make building a server easier 
// require is the command that tells code to retrieve the data from the folder we choose (express)
const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	console.log('here'); 
  res.sendFile(path.join(__dirname, './index.html'));
});


app.get('/earth', function(req, res) {
	console.log('here'); 
  res.sendFile(path.join(__dirname, './three.html'));
});

app.listen(3000, function(){
	console.log('listening!');
})
