const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// users.get('/new', (req, res) => {
//     User.find({}, (err, foundUser) => {
//         if (err) {
//             res.status(400).json({ error: err.message })
//         }
//         res.status(200).json(foundUser)
//     })
// })

users.post('/', (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log('user is created ' + createdUser)
        if (err) {
            // Tell the user something went wrong
            // status code 400 === something broke
            // json === include a body with the message from the db
            res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'success' });
    })
})


module.exports = users