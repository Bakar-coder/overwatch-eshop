const { Product } = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json({ success: true, products });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
};
