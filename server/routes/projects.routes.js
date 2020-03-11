const express = require('express')
const router = express.Router()

const Project = require('../models/Project.model')

router.get('/getAllProjects', (req, res, next) => {
    Project.find()
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

//el servicio esta llamando a /save/:id no a /save/:id/:user
router.put('/save/:id', (req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, { $set: { title: 'tt' } }, { new: true }, function (err, project) {
        if (err) return handleError(err);
        res.send(project)
    })
    // .then(theProject => console.log('editing Project', theProject))
    // .then(theProject => { res.json(theProject) })
    // .catch(err => console.log(err))
})

module.exports = router