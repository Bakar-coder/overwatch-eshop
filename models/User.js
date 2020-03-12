const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');
const Joi = require('joi');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  f_name: { type: Sequelize.STRING(100), allowNull: false },
  l_name: { type: Sequelize.STRING(100), allowNull: false },
  username: { type: Sequelize.STRING(100), allowNull: false, unique: true, validate: {isAlphanumeric: true} },
  email: { type: Sequelize.STRING(100), allowNull: false, unique: true, validate: {isEmail: true} },
  avatar: { type: Sequelize.STRING, allowNull: false },
  passwd: { type: Sequelize.STRING(100), allowNull: false },
  resetToken: Sequelize.STRING(100),
  resetTokenExpiration: Sequelize.DATE,
  is_admin: { type: Sequelize.BOOLEAN, defaultValue: false }
});

const validateRegister = user => {
  const schema = {
    f_name: Joi.string().required(),
    l_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    avatar: Joi.string(),
    passwd: Joi.string()
      .required()
      .min(8)
      .max(25),
    passwd2: Joi.string().required(),
    is_admin: Joi.boolean(),
    _csrf: Joi.string()
  };
  return Joi.validate(user, schema);
};

const validateLogin = user => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    passwd: Joi.string().required(),
    _csrf: Joi.string()
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
