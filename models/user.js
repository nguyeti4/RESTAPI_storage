/*
const { DataTypes } = require('sequelize')
const sequelize = require('../lib/sequelize')
const Business = require('./business')
const Photo = require('./photo')
const Review = require('./review')

const User = sequelize.define('user',{
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

User.hasMany(Business, {
    foreignKey: {allowNull: false},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Business.belongsTo(User)

User.hasMany(Photo, {
    foreignKey: {allowNull: false},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Photo.belongsTo(User)

User.hasMany(Review, {
    foreignKey: {allowNull: false},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Review.belongsTo(User)


module.exports = User*/