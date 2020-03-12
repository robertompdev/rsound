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

//el servicio esta llamando a /save/:id no a /save/:id/:user
router.put('/save/:id', (req, res, next) => {
    console.log(req.body) //aqui debería estar el state, ya que lo envias por AXIOS.post
    //el put es un post disfrazao ;)
    //como el modelo no coincide directamete con el state vas a tener que hacer algo de ingenieria, si coincidieran
    // 1 a 1 podrías tirar el state directamente en el update.

    //basicamente compara el state con el modelo y monta un objeto de estás caracteristicas:

    let obj = {
        //     title: req.body.project.title,
        //     description: req.body.project.description,
        bpm: req.body.project.bpm,
        // attack: req.body.project.attack,
        // decay: req.body.project.decay,
        // release: req.body.project.release,
        // sequence: req.body.project.sequence,
        // sustain: req.body.project.sustain,
        // wave: req.body.project.wave,
        // selectedResolution: req.body.project.selectedResolution,
        // dmSeq: req.body.project.selectedResolution.dmSeq,
        // imageUrl: req.body.project.selectedResolution.imageUrl,
        // autor: { type: Schema.ObjectId, ref: 'User' }
    }





    // bpm: 120,
    // step: 1,
    // attack: 0,
    // decay: 1,
    // release: 0.15,
    // sequence: [],
    // sustain: 0.05,
    // wave: 'sawtooth',
    // selectedResolution: 15,
    // dmSeq: []
    //y como ese objeto coincide con el modelo lo puedes pasar
    //directamente aquí v
    Project.findByIdAndUpdate(req.params.id, { $set: { bpm: obj.bpm } }, { new: true }, function (err, project) {
        if (err) return handleError(err);
        res.send(project)
    })
})

module.exports = router