const { Sequelize } = require('sequelize')
import mysql2 from 'mysql2'
require('dotenv').config()

if (options.dialect === 'mysql') {
  options.dialectModule = mysql2
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
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
