/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Fruit = require('../models/fruit')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

// INDEX route 
// Read -> finds and displays all fruits
router.get('/', (req, res) => {
    // find all the fruits
    Fruit.find({})
        // send json if successful
        .then(fruits => { res.json({ fruits: fruits })})
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

// CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    // here, we'll have something called a request body
    // inside this function, that will be called req.body
    // we want to pass our req.body to the create method
    const newFruit = req.body
    Fruit.create(newFruit)
        // send a 201 status, along with the json response of the new fruit
        .then(fruit => {
            res.status(201).json({ fruit: fruit.toObject() })
        })
        // send an error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

// PUT route
// Update -> updates a specific fruit
// PUT replaces the entire document with a new document from the req.body
// PATCH is able to update specific fields at specific times, but it requires a little more code to ensure that it works properly, so we'll use that later
router.put('/:id', (req, res) => {
    // save the id to a variable for easy use later
    const id = req.params.id
    // save the request body to a variable for easy reference later
    const updatedFruit = req.body
    // we're going to use the mongoose method:
    // findByIdAndUpdate
    // eventually we'll change how this route works, but for now, we'll do everything in one shot, with findByIdAndUpdate
    Fruit.findByIdAndUpdate(id, updatedFruit, { new: true })
        .then(fruit => {
            console.log('the newly updated fruit', fruit)
            // update success message will just be a 204 - no content
            res.sendStatus(204)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})
// DELETE route
// Delete -> delete a specific fruit
router.delete('/:id', (req, res) => {
    // get the id from the req
    const id = req.params.id
    // find and delete the fruit
    Fruit.findByIdAndRemove(id)
        // send a 204 if successful
        .then(() => {
            res.sendStatus(204)
        })
        // send an error if not
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Fruit.findById(id)
        // send the fruit as json upon success
        .then(fruit => {
            res.json({ fruit: fruit })
        })
        // catch any errors
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router
