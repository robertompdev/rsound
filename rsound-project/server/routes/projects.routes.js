const express = require('express')
const router = express.Router()

const Coaster = require('../models/Project.model')

router.get('/getAllProjects', (req, res, next) => {
    Coaster.find()
        .then(allProjects => res.json(allProjects))
        .catch(err => console.log(err))
})

router.get('/getOneProject/:id', (req, res, next) => {
    Project.findById(req.params.id)
        .then(theProject => res.json(theProject))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    Project.create(req.body)
        .then(theProject => res.json(theProject))
        .catch(err => console.log(err))
})

module.exports = router