/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('../utils/connection')
const Fruit = require('./fruit')

// Here, we'll add our seed script
// this will seed our database for us, just like our seed route did
// the difference is, only an 'administrative' type of user can run this script
// this script will eventually be run with the command `npm run seed`

// This is our old seed route (for reference)
// There are two ways we will talk about seeding the database
// First -> seed route, they work but they are not best practices
// Second -> seed script, they work and they ARE best practices
// router.get('/seed', (req, res) => {
//     // array of starter resources(fruits)
//     const startFruits = [
//         { name: 'Orange', color: 'orange', readyToEat: true },
//         { name: 'Grape', color: 'purple', readyToEat: true },
//         { name: 'Banana', color: 'green', readyToEat: false },
//         { name: 'Strawberry', color: 'red', readyToEat: false },
//         { name: 'Coconut', color: 'brown', readyToEat: true }
//     ]
//     // then we delete every fruit in the database(all instances of this resource)
//     Fruit.deleteMany({})
//         .then(() => {
//             // then we'll seed(create) our starter fruits
//             Fruit.create(startFruits)
//                 // tell our db what to do with success and failures
//                 .then(data => {
//                     res.json(data)
//                 })
//                 .catch(err => console.log('The following error occurred: \n', err))
//         })
// })

/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////
// first, we'll save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
    // array of starter resources(fruits)
    const startFruits = [
        { name: 'Orange', color: 'orange', readyToEat: true },
        { name: 'Grape', color: 'purple', readyToEat: true },
        { name: 'Banana', color: 'green', readyToEat: false },
        { name: 'Strawberry', color: 'red', readyToEat: false },
        { name: 'Coconut', color: 'brown', readyToEat: true }
    ]
    // then we delete every fruit in the database(all instances of this resource)
    Fruit.deleteMany({})
        .then(() => {
            // then we'll seed(create) our starter fruits
            Fruit.create(startFruits)
                // tell our app what to do with success and failures
                .then(data => {
                    console.log('here are the created fruits: \n', data)
                    // once it's done, we close the connection
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    // always close the connection
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always make sure to close the connection
            db.close()
        })
})