const Router = require("express").Router();
const { postRegister, postLogin } = require("../controllers/users");

Router.route("/register").post(postRegister);
Router.route("/login").post(postLogin);

module.exports = Router;
