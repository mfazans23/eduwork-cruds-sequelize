const { Sequelize } = require('sequelize')
const mysql2 = require(mysql2)
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
  }
)
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

module.exports = sequelize
