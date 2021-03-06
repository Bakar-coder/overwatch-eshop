const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');

module.exports = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
});
