let sequelize = require('sequelize');

sequelize = new sequelize('user_notifcation', 'postgres', '123456', {
  host: '127.0.0.1',
  dialect: 'postgres'
})

module.exports = sequelize;