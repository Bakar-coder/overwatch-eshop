// 'use strict';
require('express-async-errors');
const express = require('express');
const { sequelize } = require('./utils/database');
const path = require('path');
const compression = require('compression');
const config = require('config');
const errors = require('./middleware/error');
const helmet = require('helmet');
const fs = require('fs');
const morgan = require('morgan');
const multer = require('multer');
const passport = require('passport');
const winston = require('winston');
const port = process.env.PORT || 5000;
const app = express();

process.on('uncaughtException', ex => winston.error(ex.message, ex));

// =======================================================================================//
//                                  Checking for secretKey
// =======================================================================================//
if (!config.get('secretKey')) {
  console.log('No secret key provided..............');
  process.exit(1);
}

// =======================================================================================//
//                               creating error logs
// =======================================================================================//
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  }
);

winston.add(winston.transports.File, {
  filename: 'logfile.log',
  handleExceptions: true,
  humanReadableUnhandledException: true
});

// =======================================================================================//
//                               import all api routes
// =======================================================================================//
const users = require('./routes/users');
const products = require('./routes/products');
const admin = require('./routes/api/admin/index');

// =======================================================================================//
//                            filter image upload file types
// =======================================================================================//
const fileFilter = (req, file, cb) => {
  const mimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/jfif'
  ];
  const validFileType = mimeTypes.filter(mime => mime === file.mimetype)[0];
  return validFileType ? cb(null, true) : cb(null, false);
};

// =======================================================================================//
//                               set multer file storage
// =======================================================================================//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `client/src/images`);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

// =======================================================================================//
//                             define all app middlewares
// =======================================================================================//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  '/client/src/images',
  express.static(path.join(__dirname, 'client/src/images'))
);
app.use(multer({ storage, fileFilter }).single('image'));
app.use(
  morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
  })
);
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(helmet());
app.use(compression());
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/admin', admin);
app.use(errors);

// =======================================================================================//
//                      import models and create table associations
// =======================================================================================//
const { User } = require('./models/User');
const { Product } = require('./models/Product');
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

// =======================================================================================//
//                     Synconize application with mysql database
// =======================================================================================//
sequelize
  .sync()
  .then(() =>
    console.log('Database Connection Ok.................................')
  )
  .catch(ex => console.log('Database Connection Error! -', ex));

// =======================================================================================//
//                         Start and Run the application
// =======================================================================================//
app.listen(port, () => console.log(`serving app on port: ${port}`));
