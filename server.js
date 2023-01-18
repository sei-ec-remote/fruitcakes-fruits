/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express') // import the express framework

// we don't need the mongoose dependency in here anymore
// so we'll comment it out.
// const mongoose = require('mongoose') // import the mongoose library

const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // Load my ENV file's variables
const path = require('path') // import path module
const FruitRouter = require('./controllers/fruitControllers')

/////////////////////////////////////
//// Import Our Models           ////
/////////////////////////////////////
const Fruit = require('./models/fruit')


/////////////////////////////////////
//// Create our Express App Object //
/////////////////////////////////////
const app = express()

/////////////////////////////////////
//// Middleware                  ////
/////////////////////////////////////
// middleware runs before all the routes.
// every request is processed through our middleware before mongoose can do anything with it
app.use(morgan('tiny')) // this is for request loggging, the 'tiny' argument declares what size of morgan log to use
app.use(express.urlencoded({ extended: true })) //this parses urlEncoded request bodies(useful for POST and PUT requests)
app.use(express.static('public')) // this serves static files from the 'public' folder
app.use(express.json()) // parses incoming request payloads with JSON


/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})

// This is now where we register our routes, this is how server.js knows to send the correc response. 
// app.use, when we register a route, needs two arguments
// the first arg is the base URL, second arg is the file to use.
app.use('/fruits', FruitRouter)

/////////////////////////////////////
//// Server Listener             ////
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END