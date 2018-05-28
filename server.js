var fs = require('fs');
var data = fs.readFileSync('words.json'); 
var words = JSON.parse(data); 
console.log(words); 

// console.log("the server is starting!");

const express = require('express');
const app = express(); 

const server = app.listen(3000, listening); 

function listening() {
	console.log("listening. . ."); 	
}

app.use(express.static('public')); 

app.get('/add/:word/:score?', addWord); 

function addWord(req, res) {
	var data = req.params;
	var word = data.word;
	var score = Number(data.score);
	var reply; 
	if (!score) {
		reply = {
			msg: "Please enter a score." 
		}
		res.send(reply); 
	}
	else {
		words[word] = score;
		var data = JSON.stringify(words, null, 2);

		fs.writeFile('words.json', data, finished); 

		function finished(err) {
			console.log('all set.');
			reply = {
				word: word,
				score: score,
				status: "success" 
			}
			res.send(reply); 
		}
		 
	}

} // end addWord

app.get('/all', sendAll); 

function sendAll(req, res) {
	res.send(words); 
}

app.get('/search/:word', searchWord); 

function searchWord(req, res) {
	var word = req.params.word;
	var reply; 
	if (words[word]) {
		reply = {
			status: "found",
			word: word, 
			score: words[word]
		}
	}	
	else {
		reply = {
			status: "not found",
			word: word
		}
	}

	res.send(reply); 
}





