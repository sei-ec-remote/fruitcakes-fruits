/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express') // import the express framework
const morgan = require('morgan') // import the morgan request logger
const session = require('express-session') // import the express-session package
const MongoStore = require('connect-mongo') // import the connect-mongo package(for sessions)
require('dotenv').config()
const methodOverride = require('method-override')

/////////////////////////////////////
//// Middleware function         ////
/////////////////////////////////////
// Now, instead of processing our middleware in server.js, we're going to build a function that will take the entire app as an argument, and run requests through all of our middleware
const middleware = (app) => {
    // middleware runs before all the routes.
    // every request is processed through our middleware before mongoose can do anything with it
    // method-override is middleware that allows us to utilize forms to their full potential.
    // by default, forms can ONLY and I mean ONLY send a GET or a POST request.
    // method-override allows us to send PUT, PATCH, DELETE, and other requests from a form, by defining it with '_method'
    app.use(methodOverride('_method'))
    app.use(morgan('tiny')) // this is for request loggging, the 'tiny' argument declares what size of morgan log to use
    app.use(express.urlencoded({ extended: true })) //this parses urlEncoded request bodies(useful for POST and PUT requests)
    // using express.static('public') allows us to serve a single CSS stylesheet across our application where we want to.
    app.use(express.static('public')) // this serves static files from the 'public' folder
    app.use(express.json()) // parses incoming request payloads with JSON
    // here, we set up and utilize a session function, and we pass that function a config argument, to configure our session in the way we want. This argument will tell express-session how to create and store our session.
    // The config object, needs several keys in order to work(see express-session docs)
    // The keys are:
    // secret - a super top secret code, that allows for the creation of a session
    // this secret is kinda like authorization, that allows our app to create with connectMongo
    // store -> tells connect-mongo where to save the session(our db)
    // then two options: saveUninitialized(set to true) and resave(set to false)
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

///////////////////////////////////////////
//// Export middleware function        ////
///////////////////////////////////////////
module.exports = middleware