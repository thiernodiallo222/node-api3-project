const express = require('express');
const morgan = require('morgan');
const server = express();
require('dotenv').config();

server.use(morgan("short"));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h6>Welcome to ${process.env.COHORT}</h6>
            <h6>COHORT: ${process.env.COHORT}</h6>
            <h6>Fun Fact: ${process.env.FUN_FACT}</h6>
            <h6>EndPoint: /users, /posts</h6>
  `);
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
