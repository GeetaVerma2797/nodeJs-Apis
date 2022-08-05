var express = require('express');
var router = express.Router({mergeParams:true});

let post = require('./post');
let get = require('./get');
let del = require('./delete');

//POST requests
router.post('/insert', post.insertUserDetails);
router.post('/login', post.login);

router.get('/', get.getUserDetails);
router.delete('/:id', del.deleteUserDetails);

// console.log("rourte", router)
module.exports = router;

