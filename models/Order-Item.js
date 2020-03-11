const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');

module.exports = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});
