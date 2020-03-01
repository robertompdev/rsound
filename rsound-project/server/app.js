// Enviroment variables
require('dotenv').config()

// Database connection
require('./configs/mongoose.config')

// Application instance
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)

// Base URLS
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/projects', require('./routes/projects.routes'))
app.use('/api/files', require('./routes/files.routes.js'))

module.exports = app