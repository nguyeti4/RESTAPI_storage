const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { 
  BusinessSchema, 
  insertNewBusiness, 
  getAllBusinesses, 
  getBussinessById,
  updateBussinessById,
  deleteBussinessById
} = require('../models/business')

//const {ValidationError} = require('sequelize')

/*const Business = require('../models/business')
const Review = require('../models/review')
const Photo = require('../models/photo')
const businesses = require('../data/businesses');
const { reviews } = require('./reviews');
const { photos } = require('./photos');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { send } = require('express/lib/response');*/

exports.router = router;
//exports.businesses = businesses;

/*
 * Schema describing required/optional fields of a business object.
 */
/*
const businessSchema = {
  ownerid: { required: true },
  name: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  zip: { required: true },
  phone: { required: true },
  category: { required: true },
  subcategory: { required: true },
  website: { required: false },
  email: { required: false }
};*/

/*
 * Route to return a list of businesses.
 */

router.get('/', async function (req,res,next){
  const businesses = await getAllBusinesses()
  res.status(200).send({
    businesses: businesses
  })
})

/*
router.get('/', async function(req,res,next){
  let page = parse(req.query.page) || 1
  page = page < 1 ? 1 : page
  const pageSize = 10
  const offset = (page - 1) * pageSize

  const result = await Business.findAndCountAll({
    limit: pageSize,
    offset: offset
  })
  res.status(200).send({
    businesses: result.rows,
    page: page,
    pageSize: pageSize,
    count: result.count,
    totalPages: Math.ceil(result.count / pageSize)
  })
})*/


/*
 * Route to create a new business.
 */
/*
router.post('/', async function (req,res,next){
  try{
    const business = await Business.create(req.body, [
      'description','ownerid','name','address','city','state','zip','phone','category','subcategory','website','email','reviews','photos'
    ])
    console.log("lodging:",business.toJSON)
    res.status(201).send({id: business.id})
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
  if (validateAgainstSchema(req.body, BusinessSchema)) {
    const id = await insertNewBusiness(req.body)
    res.status(201).send({ id: id })
  } else {
    res.status(400).send({
      error: "Request body is not a valid business object"
    })
  }
})


/*
 * Route to fetch info about a specific business.
 */
router.get('/:id', async function(req,res,next){
  const id = req.params.id
  const business = await getBussinessById(id)
  res.status(200).send(business)
})
/*
router.get('/:businessid', async function(req,res,next){
  const id = req.params.businessid
  const business = await Business.findByPk(id, {
    include: Photo,
    include: Review
  })
  if(business){
    res.status(200).send(business)
  }
  else{
    next()
  }
})*/

/*
 * Route to replace data for a business.
 */
router.put('/:businessid', async function (req,res,next){
  const id = req.params.businessid
  if (validateAgainstSchema(req.body, BusinessSchema)) {
    const updateSuccessful = await
      updateBussinessById(id, req.body);
    if (updateSuccessful) {
      res.status(200).json({
        links: {
          business: `/businesses/${id}`
        }
      })
    } else {
      next();
    }
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid Bussiness."
    });
  }
})
/*
router.put('/:businessid', function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  if (businesses[businessid]) {

    if (validateAgainstSchema(req.body, businessSchema)) {
      businesses[businessid] = extractValidFields(req.body, businessSchema);
      businesses[businessid].id = businessid;
      res.status(200).json({
        links: {
          business: `/businesses/${businessid}`
        }
      });
    } else {
      res.status(400).json({
        error: "Request body is not a valid business object"
      });
    }

  } else {
    next();
  }
});*/

/*
 * Route to delete a business.
 */
/*
router.delete('/:businessid', async function(req,res,next){
  const id = req.params.businessid
  const result = await Business.destroy({where: {id: id}})
  if (result > 0){
    res.status(204).send()
  }else{
    next()
  }
})*/

router.delete('/:businessid', async function (req, res, next) {
  const id = req.params.businessid
  const deleteSuccessful = await deleteBussinessById(id);
  if (deleteSuccessful) {
  res.status(204).send({
    msg: "Deleted business " + req.originalUrl
  })
  } else {
  next();
  }
});
