const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: String,
    description: String,
    bpm: Number,
    attack: { type: Number, default: 0 },
    decay: { type: Number, default: 1 },
    release: { type: Number, default: 0.15 },
    sequence: Array,
    sustain: { type: Number, default: 0.05 },
    wave: { type: String, default: 'sawtooth' },
    selectedResolution: { type: Number, default: 15 },
    dmSeq: Array,
    imageUrl: String,
    autor: { type: Schema.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel