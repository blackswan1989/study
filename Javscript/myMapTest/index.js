//https://velog.io/@ki_blank/Node-Express-Server-c7k0xhun7f

const express = require('express');
const app = express();

const PORT = 5500;

function handleListen() {
	console.log("Listen on 5500 port")
	res.send('Home');
}

function handleHome (req, res) {
  console.log('Home');
}

app.get('/', handleHome)

app.listen(PORT, handleListen);