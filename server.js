const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const APP = express()
const PORT = process.env.PORT || 3003

APP.use(express.json())

// Mongo Setup 
mongoose.connect('mongodb://localhost:27017/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo')
})

// Cors Middleware for Requests
const whiteList = ['http://localhost:3000', 'https://phonebook-frontend-project3.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
APP.use(cors(corsOptions))

const contactsController = require('./controllers/contacts')

APP.use('/contacts', contactsController)


APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
})
