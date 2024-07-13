const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Notification = sequelize.define('Notification', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refrences: {
      Model: User,
      key: 'id'
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receivedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
},
  {
    tablName: 'notifications'
  }
);

module.exports = Notification;