const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { User, validateLogin, validateRegister } = require('../models/User');
const sendgrid_api_key = '';


// =======================================================================================//
//                             create nodemailer transport
// =======================================================================================//
 const transport = nodemailer.createTransport(sendGridTransport({
   auth: { api_key: sendgrid_api_key }
 }))

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
    return res.status(400).json({
      success: false,
      msg: 'user with the same email already exists.'
    });
  if (u_name)
    return res.status(400).json({
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
  user = await user.save();
  await user.createCart();
  await transport.sendMail({
    to: user.email,
    from: 'OverWatch.com',
    subject: 'Account creation successful.',
    html: '<h1>You successful Signed up.</h1>'
  })
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
      .json({ success: false, msg: 'Invalid email address' });
  const validPassword = await bcrypt.compare(passwd, user.passwd);
  if (!validPassword)
    return res
      .status(400)
      .json({ success: false, msg: 'Invalid password' });
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


// =======================================================================================//
//                                Password Reset api end-point
// =======================================================================================//
exports.postReset = async (req, res) => {
  const { email } = req.body;
  const buffer = await crypto.randomBytes(32);
  const token = buffer.toString('hex');
  const user = await User.findOne({ where: {email} });
  if  (!user)
    return res
      .status(400)
      .json({ success: false, msg: `Invalid Email Address - Enter the email you used to register`  });
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000;
  await user.save();
  const result = await transport.sendMail({
    to: email,
    from: 'OverWatch.com',
    subject: 'Password reset.',
    html: `
      <p>You requested for a password reset. </p>
      <p>Click this to <a href='http://localhost:3000/users/reset/${token}'>Reset</a>.</p>
    `
  })
  res.json({ success: true, msg: 'We have sent a reset password link to your email.'})
}


// =======================================================================================//
//                               New Password api end-point
// =======================================================================================//
exports.postNewPassword = async (req, res) => {
  const { passwd, token } = req.body;
  const user = await User.findOne({ where: { resetToken: token } })

  if (user && user.resetTokenExpiration > Date.now()) {
    const salt = await bcrypt.genSalt(12);
    const newPassword = await bcrypt.hash(passwd, salt);
    user.passwd = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    const result = await user.save();
    return res.json({ success: true, msg: 'Password reset successful.', result })
    }
  }
