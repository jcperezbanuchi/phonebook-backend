const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
const APP = express()
const PORT = process.env.PORT || 3003
const sessionsController = require('./controllers/sessions')
const userController = require('./controllers/users')

APP.use(express.json())
APP.use('/users', userController)
APP.use('/sessions', sessionsController)
APP.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)


// Middleware for User Authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// Mongo Setup 
mongoose.connect('mongodb://localhost:27017/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo')
})

// Cors Middleware for Requests
const whiteList = process.env.WHITELIST
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