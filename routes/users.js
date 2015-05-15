var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var path = require('path');


router.get("/", function(req,res,next){
  //if(req.isAuthenticated()){
    res.sendFile(path.resolve(__dirname, '../views/users.html'));
  //}
});

router.get('/list', function(req, res, next){
  Users.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });

});


module.exports = router;
