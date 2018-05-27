console.log("the server is starting!");

const express = require('express');
const app = express(); 

const server = app.listen(3000, listening); 

function listening() {
	console.log("listening. . ."); 	
}

app.use(express.static('public')); 

app.get('/search/:flower/:num', sendFlower); 

function sendFlower(req, res) {
	var data = req.params;
	var num = data.num; 
	var reply = ""; 
	for (var i = 0; i < num; i++) {
		reply += "I love " + data.flower + " too";
	}


	res.send(reply); 
}