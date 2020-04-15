const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`
  method:${req.method}
  request url:${req.url}
  Time stamp: ${req.timestamp}
  `);
  next
}

module.exports = server;
