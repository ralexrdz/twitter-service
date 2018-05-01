var UserController = require('../../controllers/user')
var UserModel = require('../../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function (username, password, done) {
    UserModel.findOne({ email: username }, function (err, user) {
      if (err) { return done(err) }
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      user.validPassword(password, (err, validPass) => {
        if (err) console.log(err)
        if (!validPass) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        console.log('a huevo', user)
        return done(null, user)
      })
    })
  }
))

module.exports = function (app) {
  app.post('/api/users', UserController.create)
  app.post('/api/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
}
