const { Product, validateProduction } = require('../../models/Product');

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

  if (
    image.mimetype !== 'image/jpeg' &&
    image.mimetype !== 'image/jpg' &&
    image.mimetype !== 'image/png' &&
    image.mimetype !== 'image/gif' &&
    image.mimetype !== 'image/jfif'
  )
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
      image: image.originalname
    });
    await product.save();
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
    console.log(image);

    const imageSize = 1024 * 1024 * 5;
    if (image && image.size > imageSize)
      return console.log('Image size must not exceed 5Mbs');
    const product = await Product.findOne({ where: { id: productId } });
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (image) product.image = image.originalname;
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
    await product.destroy();
    return res.json({
      success: true,
      msg: `deleted ${product.title} successfully.`
    });
  }
};
