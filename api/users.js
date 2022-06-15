const router = require('express').Router();

exports.router = router;

const { businesses } = require('./businesses');
const { reviews } = require('./reviews');
const { photos } = require('./photos');

/*const User = require('../models/user')
const Business = require('../models/business')
const Photo = require('../models/photo')
const Review = require('../models/review')*/

const { getAllBusinessesByOwnerId } = require('../models/business')
const { getAllPhotosByOwnerId } = require('../models/photo')
const { getAllReviewsByOwnerId } = require('../models/review')
/*
 * Route to list all of a user's businesses.
 */

/*router.get('/:userid/businesses', async function (req,res) {
  const id = req.params.userid
  const user = await User.findByPk(id, {
    include: Business
  })
  if(user){
    res.status(200).send(user)
  }
  else{
    next()
  }
})*/
router.get('/:userid/businesses', async function (req, res) {
  const id = parseInt(req.params.userid)
  const businesses = await getAllBusinessesByOwnerId(id)
  res.status(200).send({
    businesses: businesses
  })
});


/*
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', async function(req,res){
  const id = parseInt(req.params.userid)
  const reviews = await getAllReviewsByOwnerId(id)
  res.status(200).send({
    reviews: reviews
  })
})
/*
router.get('/:userid/reviews', function (req, res) {
  const userid = parseInt(req.params.userid);
  const userReviews = reviews.filter(review => review && review.userid === userid);
  res.status(200).json({
    reviews: userReviews
  });
});*/

/*
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', async function (req,res) {
  const id = parseInt(req.params.userid)
  const photos = await getAllPhotosByOwnerId(id)
  res.status(200).send({
    photos: photos
  })
})
/*
router.get('/:userid/photos', function (req, res) {
  const userid = parseInt(req.params.userid);
  const userPhotos = photos.filter(photo => photo && photo.userid === userid);
  res.status(200).json({
    photos: userPhotos
  });
});*/
