const express = require ('express')
const path = require ('path')
const jwt = require('jsonwebtoken')
import pug from 'pug'
import config from './config'


// Initializations
const app = express()
require ('./database')
 

// Settings
app.set('port', process.env.PORT || 1100)
app.set('secret', config.jwt.secret);
app.set('view engine', pug)
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Routes
app.use(require('./routes/index'))
app.use(require('./routes/todo'))
app.use(require('./routes/users'))


// Static file
app.use(express.static(path.join(__dirname, 'public')))

// listen port

app.listen(app.get('port'), () => {
   console.log(`serve on port:  ${app.get('port')}`) 
})


