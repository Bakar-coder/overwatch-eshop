const { Product, validateProduction } = require('../../models/Product');
const  { deleteFile } = require('../../config/file');
const io = require('../../socket');

exports.postAddProduct = async (req, res) => {
  const { error } = validateProduction(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  let { title, price, description } = req.body;
  price = Number(price);

  if (!price)
    return res.status(400).json({
      success: false,
      msg: 'Price is not allowed empty and must be a number.'
    });

  const image = req.file;
  if (!image)
    return res
      .status(400)
      .json({ success: false, msg: 'Product image is required.' });

  const mimetypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/jfif'
  ];

  const validMimetype = mimetypes.filter(mime => mime === image.mimetype)[0];

  if (!validMimetype)
    return res.status(400).json({
      success: false,
      msg: 'Unsupported file type uploaded. Only image files allowed.'
    });

  const imageSize = 1024 * 1024 * 5;
  if (image.size > imageSize)
    return res
      .status(400)
      .json({ success: false, msg: 'Image size must not exceed 5Mbs' });

  if (req.user.is_admin) {
    let product = await Product.findOne({ where: { title } });
    if (product)
      return res
        .status(400)
        .json({ success: false, msg: 'Product already exists.' });
    product = new Product({
      userId: req.user.id,
      title,
      description,
      price,
      image: image.filename
    });
    await product.save();
    io.getIo().emit('products', { action: 'create', product });
    return res.json({
      success: true,
      msg: `added ${product.title} successfully.`
    });
  } else
    return res.status(403).json({
      success: false,
      msg: 'Unauthorized! - Access granted to admins only.'
    });
};

// Post admin edit product
exports.postAdminEditProduct = async (req, res) => {
  if (req.user.is_admin) {
    const { title, description, price, id } = req.body;
    const productId = Number(id);
    const image = req.file;
    const imageSize = 1024 * 1024 * 5;
    if (image && image.size > imageSize)
      return console.log('Image size must not exceed 5Mbs');
    const product = await Product.findOne({ where: { id: productId } });
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (image) {
      deleteFile(`client/src/images/${product.image}`);
      product.image = image.originalname;
    }
    await product.save();
    return res.json({
      success: true,
      msg: `updated ${product.title} successfully.`,
      product
    });
  }
};

// Post admin delete product
exports.postAdminDeleteProduct = async (req, res) => {
  if (req.user.is_admin) {
    const { id } = req.body;
    const product = await Product.findOne({ where: { id } });
    product && deleteFile(`client/src/images/${product.image}`);
    await product.destroy();
    return res.json({
      success: true,
      msg: `deleted ${product.title} successfully.`
    });
  }
};
