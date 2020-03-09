const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    imageUrl: String,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel