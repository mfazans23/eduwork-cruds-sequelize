const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sql12594565', 'sql12594565', 'QwD4Tls7DT', {
  host: 'sql12.freesqldatabase.com',
  dialect: 'mysql',
})
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

module.exports = sequelize
