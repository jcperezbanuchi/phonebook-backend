const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    firstName: { type:String, required:true },
    lastName: { type:String, required:true },
    phoneNumber: { type:String, required:true },
    address: { type:String },
    socialLinks: { type:String }
})

module.exports = mongoose.model('Contact', contactSchema)