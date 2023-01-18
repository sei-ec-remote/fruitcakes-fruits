/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////
// POST -> /users/signup
// This route creates new users in our db
router.post('/signup', async (req, res) => {
    // this route will take a req.body and use that data to create a user
    const newUser = req.body
    // console.log('this is req.body', req.body)
    // we'll need to encrypt their password
    // this is where bcrypt comes into play
    // for the sake of bcrypt, we're going to use async and await
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    // then create the user
    User.create(newUser)
        // if we're successful, send a 201 status
        .then(user => {
            // console.log('new user created \n', user)
            res.status(201).json({ username: user.username })
        })
        // if there is an error, handle the error
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router