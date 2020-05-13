require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')

app.use('/bulmaCss', express.static(__dirname + '/node_modules/bulma/css'))
app.use('/css', express.static(__dirname + '/src/css'))
app.use('/img', express.static(__dirname + '/src/img'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

require('./models/recipe');

const recipesRouter = require('./routes/recipes')
app.use('/', recipesRouter)

nunjucks.configure('views', {
  autoescape : true,
  express : app
})

app.listen(3000, () => console.log('Server Started'))
