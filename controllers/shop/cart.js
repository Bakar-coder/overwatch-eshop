const { Product } = require('../../models/Product');

exports.getCart = async (req, res) => {
  const cart = await req.user.getCart();
  const cartProducts = await cart.getProducts();
  res.json({ success: true, cartProducts });
};

exports.postCart = async (req, res) => {
  const { id } = req.body.product;
  const cart = await req.user.getCart();
  const cartProduct = await cart.getProducts({ where: { id } });
  let product;
  let newQuantity = 1;
  if (cartProduct.length > 0) {
    product = cartProduct[0];
  }
  if (product) {
  }

  product = await Product.findById(id);
  await cart.addProduct(product, { through: { quantity: newQuantity } });
  res.json({ success: true, cart });
};
