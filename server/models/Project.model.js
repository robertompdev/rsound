const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: String,
    description: String,
    bpm: Number,
    synth1:
    {
        attack: Number,
        decay: Number,
        release: Number,
        sequence: Array,
        sustain: Number,
        sustainMax: Number,
        volume: Number,
        wave: String,
        selectedResolution: Number,
    },
    synth2: {
        attack: Number,
        decay: Number,
        release: Number,
        sequence: Array,
        sustain: Number,
        sustainMax: Number,
        volume: Number,
        wave: String,
        selectedResolution: Number,
    },
    drumMachine: {
        selectedResolution: Number,
        volume: Number,
        dmSeq: Array,
    },

    imageUrl: String,
    autor: { type: Schema.ObjectId, ref: 'User' },
}, {
    timestamps: true
})

const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel