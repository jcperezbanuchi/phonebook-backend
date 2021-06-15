const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const APP = express()
const PORT = process.env.PORT



APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
})
