const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
const APP = express()
const PORT = process.env.PORT || 3003
const sessionsController = require('./controllers/sessions')
const userController = require('./controllers/users')


// Cors Middleware for Reques
const whiteList = ['http://localhost:3000/', 'https://phonebook-frontend-project3.herokuapp.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) >= 0) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

APP.use(cors())


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

const MONGODBNAME = process.env.MONGODBNAME || 'mongodb://localhost:27017/' + 'contacts'

// Mongo Setup 
mongoose.connect(MONGODBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo')
})




const contactsController = require('./controllers/contacts')

APP.use('/contacts', contactsController)


APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
})
