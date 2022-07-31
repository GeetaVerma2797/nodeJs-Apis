var express = require('express');
var router = express.Router({mergeParams:true});

let get = require('./get')

router.get('/movieByTitle/:title', get.movieByTitle);
router.get('/:id', get.movieById);
router.get('/releasedYear/:year', get.movieByReleasedYear);
router.get('/rating/higherThan/:rate', get.movieByRatingHigher);
router.get('/rating/lowerThan/:rate', get.movieByRatingLower);
router.get('/ratingRange/:rate', get.movieByRatingRange);
router.get('/byGenre/:genre', get.movieByGenre);


// console.log("rourte", router)
module.exports = router;

