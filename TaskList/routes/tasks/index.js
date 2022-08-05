var express = require('express');
var router = express.Router({mergeParams:true});
const checkAuth = require("../../middleware/check-auth");
const fileUploadHandler = require("../../middleware/file-upload-handler");

let post = require('./post');
let get = require('./get');
let put = require('./put');
let del = require('./delete');

//POST requests
router.post('/', fileUploadHandler, post.createTask);
router.put('/:id', checkAuth, fileUploadHandler, put.updateTask);

router.get('/', checkAuth, get.getTasks);
router.delete('/:id',checkAuth, del.deleteTask);

// console.log("rourte", router)
module.exports = router;

