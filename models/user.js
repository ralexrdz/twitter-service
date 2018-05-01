var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
mongoose.connect('mongodb://localhost/twitter-demo')

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  console.log('pre')
  var user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  // hash the password using our new salt
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    // override the cleartext password with the hashed one
    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (password, callback) {
  console.log('pasword:', password)
  console.log('vp user:', this)
  bcrypt.compare(password, this.password, (err, samepass) => {
    if (err) console.log(err)
    console.log('samepass', samepass)
    return callback(null, samepass)
  })
}

module.exports = mongoose.model('user', userSchema)
