/* 
-------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/reviews`
------------------------------------------------------------- */


/* Require modules
---------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')


/* Routes
---------------------------------------------------------- */
// Index Route (GET/Read): Will display all reviews
router.get('/:parkId', function (req, res) {
    db.Review.find({ parkId: req.params.parkId })
        .then(reviews => res.json(reviews))
})

// Create Route (POST/Create): This route receives a POST request and
// creates a new review document using the request body
router.post('/', (req, res) => {
    db.Review.create(req.body)
        .then(review => res.json(review))
})

// Update Route (PUT/Update): This route receives a PUT request and 
// edits the specified review document using the request body
router.put('/:id', (req, res) => {
    db.Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(review => res.json(review))
})

// Destroy Route (DELETE/Delete): This route deletes a review document 
// using the URL parameter (which will always be the review document's ID)
router.delete('/:id', (req, res) => {
    db.Review.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedReviewId: req.params.id }))
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router