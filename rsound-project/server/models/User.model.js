const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    imageUrl: String
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel