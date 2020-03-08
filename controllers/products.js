const { Product } = require('../models/Product');

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    return res.json({ success: true, products });
};
