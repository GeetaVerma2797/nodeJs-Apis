var express = require('express');
var router = express.Router({mergeParams:true});

let post = require('./post');
let get = require('./get')
//POST requests
// router.post('/addMovie', post.addMovie);
router.get('/movieByTitle/:title', get.movieByTitle);
router.get('/:id', get.movieById);
router.get('/releasedYear/:year', get.movieByReleasedYear);
router.get('/rating/higherThan/:rate', get.movieByRatingHigher);
router.get('/rating/lowerThan/:rate', get.movieByRatingLower);
router.get('/ratingRange/:rate', get.movieByRatingRange);


// console.log("rourte", router)
module.exports = router;

