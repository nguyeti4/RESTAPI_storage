const { ObjectId } = require('mongodb')
const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

const PhotoSchema = {
    description: {required: false},
    userid: { required: true },
    businessid: { required: true },
    caption: { required: false }
};

exports.PhotoSchema = PhotoSchema

exports.insertNewPhoto = async function insertNewPhoto(photo){
    const db = getDbInstance()
    const collection = db.collection('photos')
    
    photo = extractValidFields(photo, PhotoSchema)
    photo.businessid = new ObjectId(photo.businessid)
    const result = await collection.insertOne(photo)
    return result.insertedId
}

exports.getPhotoById = async function getPhotoById(id) {
    const db = getDbInstance()
    const collection = db.collection('photos')
    //const businesses = await collection.find({
    //    _id: new ObjectId(id)
    //}).toArray()
    const photos = await collection.aggregate([
        { $match: { _id: new ObjectId(id) } }
    ]).toArray()
    return photos[0]
}

exports.updatePhotoById = async function updatePhotoById(id, photo) {
    const photoValues = {
        description: photo.description,
        userid: photo.userid,
        businessid: photo.businessid,
        caption: photo.caption
    };
    const db = getDbInstance()
    const collection = db.collection('photos');
    const result = await collection.replaceOne(
      { _id: new ObjectId(id) },
      photoValues
    );
    return result.matchedCount > 0;
  }

exports.deletePhotoById = async function deletePhotoById(id) {
    const db = getDbInstance()
    const collection = db.collection('photos');
    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });
    return result.deletedCount > 0;
  }

exports.getAllPhotosByOwnerId = async function getAllPhotosByOwnerId(id){
    const db = getDbInstance()
    const collection = db.collection('photos')
    const photos = await collection.find({
        userid: id 
    }).toArray()
    return photos
}
/*const { DataTypes } = require('sequelize')
const sequelize = require('../lib/sequelize')

const Photo = sequelize.define('photo',{
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
    caption: {
        type: DataTypes.STRING,
        allowNull: true
    }

})

module.exports = Photo*/