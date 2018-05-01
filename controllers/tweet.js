var TweetModel = require('../models/tweet')
const jwt = require('jsonwebtoken')

function create (req, res, next) {
  if (req.user) {
    let newTweet = new TweetModel(req.body)
    newTweet.user = authData.user.email
    newTweet.save(function (err, user) {
      if (err) console.log(err)
      console.log('user', user)
      res.send(user)
    })
  } else {
    res.sendStatus(403)
  }
}

function find (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  TweetModel.find({}, function (err, tweets) {
    if (err) console.log(err)
    console.log('tweets.length', tweets.length)
    res.send(tweets)
  })
}

module.exports = {
  create,
  find
}
