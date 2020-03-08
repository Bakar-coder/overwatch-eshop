const Router = require("express").Router();
const { getProducts } = require("../controllers/products");

Router.route("/").get(getProducts);

module.exports = Router;
