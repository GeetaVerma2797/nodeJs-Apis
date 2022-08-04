var express = require('express');
var router = express.Router({mergeParams:true});

let post = require('./post');

//POST requests
router.post('/insert', post.insertUserDetails);
router.post('/login', post.login);


// console.log("rourte", router)
module.exports = router;

