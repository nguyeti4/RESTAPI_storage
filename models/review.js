const { ObjectId } = require('mongodb');
const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

const ReviewSchema = {
    description: {required: false},
    userid: { required: true },
    businessid: { required: true },
    dollars: { required: true},
    stars: { required: true},
    review: { required: false }
};

exports.ReviewSchema = ReviewSchema

exports.insertNewReview = async function insertNewReview(review){
    const db = getDbInstance()
    const collection = db.collection('reviews')
    
    review = extractValidFields(review, ReviewSchema)
    review.businessid = new ObjectId(review.businessid)
    const result = await collection.insertOne(review)
    return result.insertedId
}

exports.getReviewById = async function getReviewById(id) {
    const db = getDbInstance()
    const collection = db.collection('reviews')
    //const businesses = await collection.find({
    //    _id: new ObjectId(id)
    //}).toArray()
    const reviews = await collection.aggregate([
        { $match: { _id: new ObjectId(id) } }
    ]).toArray()
    return reviews[0]
}

exports.updateReviewById = async function updatePhotoById(id, review) {
    const reviewValues = {
        description: review.description,
        userid: review.userid,
        businessid: review.businessid,
        dollars: review.dollars,
        stars: review.stars,
        review: review.review
    };
    const db = getDbInstance()
    const collection = db.collection('reviews');
    const result = await collection.replaceOne(
      { _id: new ObjectId(id) },
      reviewValues
    );
    return result.matchedCount > 0;
  }

exports.deleteReviewById = async function deleteReviewById(id) {
    const db = getDbInstance()
    const collection = db.collection('reviews');
    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });
    return result.deletedCount > 0;
  }

exports.getAllReviewsByOwnerId = async function getAllReviewsByOwnerId(id){
    const db = getDbInstance()
    const collection = db.collection('reviews')
    const reviews = await collection.find({
        userid: id 
    }).toArray()
    return reviews
}
/*
const { DataTypes } = require('sequelize')
const sequelize = require('../lib/sequelize')

const Review = sequelize.define('review',{
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    businessid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dollars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stars: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true
    }

})

module.exports = Review*/