const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: String,
    description: String,
    parameters: String,
    imageUrl: String,
    autor: { type: Schema.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel