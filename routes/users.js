const Router = require("express").Router();
const { postRegister, postLogin,postReset, postNewPassword } = require("../controllers/users");

Router.route("/register").post(postRegister);
Router.route("/login").post(postLogin);
Router.route("/reset").post(postReset);
Router.route("/new-password").post(postNewPassword);

module.exports = Router;
