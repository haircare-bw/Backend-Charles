//import express, cors, helmet, and morgan
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//import the routers
const userRouter = require('../routes/userRouter.js');
const stylistRouter = require('../routes/stylistRouter.js');

//define the server and add use imports
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('common'));
server.use(logger)


//load the routes that were imported
server.use('/api/users', userRouter);
server.use('/api/stylists', stylistRouter); 

//check to see if the server is running 
server.get('/', (req, res) => {
  res.send(`
    <h1> You Complete Me! </h1>
  `)
})

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}' and this is when it happened '${Date.now()}`)
  next();
}

//export 
module.exports = server;