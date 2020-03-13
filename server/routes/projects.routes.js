const express = require('express')
const router = express.Router()

const Project = require('../models/Project.model')

router.get('/getAllProjects', (req, res, next) => {
    Project.find()
        .populate('autor')
        .then(allProjects => res.json(allProjects))
        .catch(err => console.log(err))
})

router.get('/getOneProject/:id/:userid', (req, res, next) => {
    Project.findById(req.params.id)
        .then(theProject => res.json(theProject))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    Project.create(req.body)
        .then(theProject => res.json(theProject))
        .catch(err => console.log(err))
})

router.put('/save/:id', (req, res, next) => {
    console.log(req.body)
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.redirect(`/`))
        .catch(err => next(new Error(err)))
})

module.exports = router