const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { 
  ReviewSchema, 
  insertNewReview, 
  getReviewById,
  updateReviewById,
  deleteReviewById
} = require('../models/review')
//const { ValidationError } = require('sequelize')
const reviews = require('../data/reviews');

exports.router = router;
exports.reviews = reviews;

//const Review = require('../models/review')

/*
 * Schema describing required/optional fields of a review object.
 */
/*const reviewSchema = {
  userid: { required: true },
  businessid: { required: true },
  dollars: { required: true },
  stars: { required: true },
  review: { required: false }
};
*/

/*
 * Route to create a new review.
 */
router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, ReviewSchema)) {
    const id = await insertNewReview(req.body)
    res.status(201).send({ id: id })
  } else {
    res.status(400).send({
      error: "Request body is not a valid review object"
    })
  }
});

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', async function (req, res, next) {
  const id = req.params.reviewID
  const review = await getReviewById(id)
  res.status(200).send(review)
});

/*
 * Route to update a review.
 */
router.put('/:reviewID', async function (req,res,next){
  const id = req.params.reviewID
  if (validateAgainstSchema(req.body, ReviewSchema)) {
    const updateSuccessful = await
      updateReviewById(id, req.body);
    if (updateSuccessful) {
      res.status(200).json({
        links: {
          business: `/reviews/${id}`
        }
      })
    } else {
      next();
    }
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid Photo."
    });
  }
})


/*
 * Route to delete a review.
 */
/*
router.delete('/:reviewID', async function(req,res,next){
  const id = req.params.reviewID
  const result = await Business.destroy({where: {id: id}})
  if (result > 0){
    res.status(204).send()
  }else{
    next()
  }
})*/

router.delete('/:reviewID', async function (req, res, next) {
  const id = req.params.reviewID
  const deleteSuccessful = await deleteReviewById(id);
  if (deleteSuccessful) {
  res.status(204).send({
    msg: "Deleted review " + req.originalUrl
  })
  } else {
  next();
  }
});
