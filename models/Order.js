const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');

module.exports = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
});
