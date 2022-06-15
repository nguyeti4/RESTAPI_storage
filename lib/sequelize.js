const {Sequelize} = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3312,
    database: process.env.MYQSL_DB_NAME,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
})

module.exports = sequelize