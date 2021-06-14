const express = require('express')
const contacts = express.Router()
const Contact = require('../models/contacts')

contacts.get('/', (req, res) => {
    Contact.find({}, (err, foundContacts) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(foundContacts)
    })
})

contacts.post('/', (req, res) => {
    Contact.create(req.body, (err, createdContact) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(createdContact)
    })
})

contacts.put('/:id', (req, res) => {
    Contact.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedContact) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(updatedContact)
    })
})

contacts.delete('/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, deletedContact) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json({
            'deleted_contact': deletedContact
        })
    })
})


module.exports = contacts