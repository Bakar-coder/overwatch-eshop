const Sequelize = require("sequelize");
const { sequelize } = require("../utils/database");
const Joi = require("joi");

const Product = sequelize.define("products", {
  id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, allowNull: false, unique: true },
  description: { type: Sequelize.TEXT, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.DECIMAL(8, 2), allowNull: false, validate: { isNumeric: true } }
});

const validateProduction = product => {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.object()
  };

  return Joi.validate(product, schema);
};

exports.Product = Product;
exports.validateProduction = validateProduction;
