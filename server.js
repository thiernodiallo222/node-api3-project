const express = require('express');
const morgan = require('morgan');
const server = express();

server.use(morgan("short"));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use((req, res) => {
  res.status(404).json(`The route: ${req.url}, does not exist in our  API` );
})

//custom middleware

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(req.timestamp);
  next();
}

module.exports = server;
