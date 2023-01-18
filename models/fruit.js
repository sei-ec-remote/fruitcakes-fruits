//////////////////////////////////////////////////////////////
//// Our schema and model for the fruit resource          ////
//////////////////////////////////////////////////////////////
// This is the old mongoose import
// const mongoose = require('mongoose') // import mongoose
// now we want our mongoose object to relate to our db
// so we're going to bring in the mongoose connection from our utils
const mongoose = require('../utils/connection')

// we'll destructure the Schema and model functions from mongoose
const { Schema, model } = mongoose

// fruits schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// make the fruit model
// the model method takes two arguments
// the first is what we call our model
// the second is the schema used to build the model
const Fruit = model('Fruit', fruitSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = Fruit