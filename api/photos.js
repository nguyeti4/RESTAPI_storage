const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { 
  PhotoSchema, 
  insertNewPhoto, 
  getPhotoById,
  updatePhotoById,
  deletePhotoById
} = require('../models/photo')
//const { ValidationError } = require('sequelize')
const photos = require('../data/photos');

exports.router = router;
exports.photos = photos;

const Photo = require('../models/photo')

/*
 * Schema describing required/optional fields of a photo object.
 */
/*const photoSchema = {
  userid: { required: true },
  businessid: { required: true },
  caption: { required: false }
};*/


/*
 * Route to create a new photo.
 */
/*
router.post('/', async function(req,res,next){
  try{
    const photo = await Photo.create(req.body, [
      "description","userid","businessid","caption"
    ])
    res.status(201).send({id: photo.id})
  }
  catch(e){
    if(e instanceof ValidationError){
      res.status(400).send({
        err: e.message
      })
    }else{
      throw e
    }
  }
})*/

router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, PhotoSchema)) {
    const id = await insertNewPhoto(req.body)
    res.status(201).send({ id: id })
  } else {
    res.status(400).send({
      error: "Request body is not a valid photo object"
    })
  }
});


/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', async function(req,res,next){
  const id = req.params.photoID
  const photo = await getPhotoById(id)
  res.status(200).send(photo)
})
/*
router.get('/:photoID', function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  if (photos[photoID]) {
    res.status(200).json(photos[photoID]);
  } else {
    next();
  }
});*/

/*
 * Route to update a photo.
 */


router.put('/:photoID', async function (req,res,next){
  const id = req.params.photoID
  if (validateAgainstSchema(req.body, PhotoSchema)) {
    const updateSuccessful = await
      updatePhotoById(id, req.body);
    if (updateSuccessful) {
      res.status(200).json({
        links: {
          business: `/photos/${id}`
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
 * Route to delete a photo.
 */
/*
router.delete('/:photoID', async function(req,res,next){
  const id = req.params.photoID
  const result = await Photo.destroy({where: {id: id}})
  if (result > 0){
    res.status(204).send()
  }else{
    next()
  }
})*/

router.delete('/:photoID', async function (req, res, next) {
  const id = req.params.photoID
  const deleteSuccessful = await deletePhotoById(id);
  if (deleteSuccessful) {
  res.status(204).send({
    msg: "Deleted photo " + req.originalUrl
  })
  } else {
  next();
  }
});
