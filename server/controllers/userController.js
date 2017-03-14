const User = require('../models/user.js');
var hash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {

  login: function(req, res, next) {
    User.findOne({username:req.body.username}, function(err, data){
      if (err){
        res.send(err)
      }
      if(hash.verify(req.body.password, data.password)){
        var token = jwt.sign({ username: req.body.username }, process.env.SECRET, { expiresIn: '1d' });
        res.send({ token: token, username: req.body.username })
      }else{
        res.send('no authorize')
      }

    })
  },

  register: function(req, res, next) {
    User.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      email: req.body.email
    }, function (err, data) {
      if (err) {
        res.send(err)
      }else{
        res.send(data)
      }
    })
  },
  getData: function (req, res) {
    User.find({}, function(err,data){
      if(err){
        res.send(err)
      }else(
        res.send(data)
      )
    })
  },

  verify: function(req, res, next){
    if (req.headers.token == 'null') {
      res.send("no authorization")
    }else{
      if (jwt.verify(req.headers.token, process.env.SECRET)) {
        // var decoded = jwt_decode(req.headers.token)
        // req.user = decoded
        next()
      }else {
        res.send("expired token")
      }
    }
  },
  getUser: function (req,res) {
    res.send(req.user)
  }

}
