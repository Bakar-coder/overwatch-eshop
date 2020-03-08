const winston = require('winston');

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).json({ success: false, msg: err.message });
};
