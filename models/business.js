const { ObjectId } = require('mongodb')
const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

const BusinessSchema = {
    description: {required: false},
    ownerid: {required: true},
    name: {required: true},
    address: {required: true},
    city: {required: true},
    state: {required: true},
    zip: {required: true},
    phone: {required: true},
    category: {required: true},
    subcategory: {required: true},
    website: {required: true},
    email: {required: true},
    reviews: {required: false},
    photos: {required: false}
}

exports.BusinessSchema = BusinessSchema

exports.insertNewBusiness = async function insertNewBusiness(business){
    const db = getDbInstance()
    const collection = db.collection('businesses')
    
    business = extractValidFields(business, BusinessSchema)
    const result = await collection.insertOne(business)
    return result.insertedId
}

exports.getAllBusinesses = async function getAllBusinesses(){
    const db = getDbInstance()
    const collection = db.collection('businesses')
    const businesses = await collection.find({}).toArray()
    return businesses
}

exports.getAllBusinessesByOwnerId = async function getAllBusinessesByOwnerId(id){
    const db = getDbInstance()
    const collection = db.collection('businesses')
    const businesses = await collection.find({
        ownerid: id 
    }).toArray()
    return businesses
}

exports.getBussinessById = async function getBussinessById(id) {
    const db = getDbInstance()
    const collection = db.collection('businesses')
    //const businesses = await collection.find({
    //    _id: new ObjectId(id)
    //}).toArray()
    const businesses = await collection.aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $lookup: {
            from: "photos",
            localField: "_id",
            foreignField: "businessid",
            as: "photos"
        },
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "businessid",
            as: "reviews"
        },
    }
    ]).toArray()
    return businesses[0]
}

exports.updateBussinessById = async function updateBusinessById(id, business) {
    const businessValues = {
        description: business.description,
        ownerid: business.ownerid,
        name: business.name,
        address: business.address,
        city: business.city,
        state: business.state,
        zip: business.zip,
        phone: business.phone,
        category: business.category,
        subcategory: business.subcategory,
        website: business.website,
        email: business.email,
        reviews: business.reviews,
        photos: business.photos
    };
    const db = getDbInstance()
    const collection = db.collection('businesses');
    const result = await collection.replaceOne(
      { _id: new ObjectId(id) },
      businessValues
    );
    return result.matchedCount > 0;
  }

exports.deleteBussinessById = async function deleteBussinessById(id) {
    const db = getDbInstance()
    const collection = db.collection('businesses');
    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });
    return result.deletedCount > 0;
  }
/*
const { DataTypes } = require('sequelize')
const { getDbInstance } = require('../lib/mongo')
const sequelize = require('../lib/sequelize')
const Photo = require('./photo')
const Review = require('./review')

const Business = sequelize.define('business',{
    ownerid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    zip: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subcategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }

})

Business.hasMany(Photo, {
    foreignKey: {allowNull: false},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Photo.belongsTo(Business)

Business.hasMany(Review, {
    foreignKey: {allowNull: false},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Review.belongsTo(Business)

module.exports = Business
*/