const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// const session = require('express-session')
// const passport = require('passport')
// var cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

var session = require('express-session')
// Inicializa sesión de servidor para express
app.use(session({ secret: 'cats', cookie: {maxAge: 100000000} }))

app.use(cookieParser())
// inicializas servicio de passport
app.use(passport.initialize())
// inicializas servicio de sesiones de passport
app.use(passport.session())

passport.serializeUser(function (user, done) {
  console.log('serialize', user)
  done(null, user.email) // the user id that you have in the session
})

passport.deserializeUser(function (id, done) {
  console.log('desearilize', id)
  done(null, id) // generally this is done against user database as validation
})
// const AuthController = require('./controllers/auth')

const tweetRoutes = require('./routes/apis/tweets')
const userRoutes = require('./routes/apis/user')

/// set
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

tweetRoutes(app)
userRoutes(app)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
