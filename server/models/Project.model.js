const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: String,
    description: String,
    bpm: { type: Number, default: 120 },
    step: Number,
    attack: { type: Number, default: 0 },
    decay: { type: Number, default: 1 },
    release: { type: Number, default: 0.15 },
    sequence: Array,
    sustain: { type: Number, default: 0.05 },
    wave: { type: String, default: 'sawtooth' },
    selectedResolution: { type: Number, default: 15 },
    dmSeq: Array,
    imageUrl: { type: String, default: 'https://res.cloudinary.com/dnzarhjsc/image/upload/v1583069489/projects/msource.jpg.jpg' },
    autor: { type: Schema.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel