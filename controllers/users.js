const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const config = require('config');
const { User, validateLogin, validateRegister } = require('../models/User');

// =======================================================================================//
//                            User Registration api end-point
// =======================================================================================//
exports.postRegister = async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  const {
    f_name,
    l_name,
    username,
    email,
    passwd,
    passwd2,
    is_admin
  } = req.body;
  if (passwd !== passwd2)
    return res
      .status(400)
      .json({ success: false, msg: "Passwords do't match." });
  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
  let user = await User.findOne({ where: { email } });
  let u_name = await User.findOne({ where: { username } });
  if (user)
    return res
      .status(400)
      .json({
        success: false,
        msg: 'user with the same email already exists.'
      });
  if (u_name)
    return res
      .status(400)
      .json({
        success: false,
        msg: 'user with the same username already exists.'
      });
  user = new User({
    f_name,
    l_name,
    username,
    email,
    avatar,
    passwd,
    is_admin
  });
  const salt = await bcrypt.genSalt(12);
  user.passwd = await bcrypt.hash(user.passwd, salt);
  await user.save();
  return res.json({ success: true, msg: 'Registration successful.' });
};

// =======================================================================================//
//                                   User Login api end-point
// =======================================================================================//
exports.postLogin = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  const { email, passwd } = req.body;
  let user = await User.findOne({ where: { email } });
  if (!user)
    return res
      .status(400)
      .json({ success: false, msg: 'Invalid email or password' });
  const validPassword = await bcrypt.compare(passwd, user.passwd);
  if (!validPassword)
    return res
      .status(400)
      .json({ success: false, msg: 'Invalid email or password' });
  user = {
    id: user.id,
    firstName: user.f_name,
    lastName: user.l_name,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    admin: user.is_admin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  const token = await Jwt.sign(user, config.get('secretKey'), {
    expiresIn: 3600
  });

  return res
    .header('x-auth-token', 'Bearer ' + token)
    .header('access-control-expose-headers', 'x-auth-token')
    .json({ success: true, msg: 'Login successful.' });
};
