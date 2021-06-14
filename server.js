const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const APP = express()
const PORT = process.env.PORT

APP.use(express.json())

// Mongo Setup 
mongoose.connect('mongodb://localhost:27017/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo')
})



APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
})