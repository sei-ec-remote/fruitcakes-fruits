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
// Subdocuments are not mongoose models. That means they don't have their own collection, and they don't come with the same model methods that we're used to(they have some their own built in.)
// This also means, that a subdoc is never going to be viewed without it's parent document. We'll never see a comment without seeing the fruit it was commented on first.

// This also means, that when we make a subdocument, we must MUST refer to the parent so that mongoose knows where in mongodb to store this subdocument

// POST -> `/comments/<someFruitId>`
// only loggedin users can post comments
// bc we have to refer to a fruit, we'll do that in the simplest way via the route
router.post('/:fruitId', (req, res) => {
    // first we get the fruitId and save to a variable
    const fruitId = req.params.fruitId
    // then we'll protect this route against non-logged in users
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the comment
        // this is exactly like how we added the owner to our fruits
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401) //send a 401-unauthorized
    }
    // saves the req.body to a variable for easy reference later
    const theComment = req.body
    // find a specific fruit
    Fruit.findById(fruitId)
        .then(fruit => {
            // create the comment(with a req.body)
            fruit.comments.push(theComment)
            // save the fruit
            return fruit.save()
        })
        // respond with a 201 and the fruit itself
        .then(fruit => {
            res.status(201).json({ fruit: fruit })
        })
        // catch and handle any errors
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router