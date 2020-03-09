const { Product } = require('../../models/Product');

exports.getCart = async (req, res) => {
  const cart = await req.user.getCart();
  const cartProducts = await cart.getProducts();
  res.json({ success: true, cartProducts });
};

exports.postAddCart = async (req, res) => {
  const { id } = req.body;
  const cart = await req.user.getCart();
  const cartProduct = await cart.getProducts({
    where: { id }
  });
  let product;
  let newQuantity = 1;

  if (cartProduct.length > 0) {
    product = cartProduct[0];
  }

  if (product) {
    const oldQuantity = product.cartItem.quantity;
    newQuantity = oldQuantity + 1;
    await cart.addProduct(product, { through: { quantity: newQuantity } });
    return res.json({ success: true, cartProduct });
  }

  product = await Product.findOne({ where: { id } });
  await cart.addProduct(product, { through: { quantity: newQuantity } });
  res.json({ success: true, cartProduct });
};

exports.postDeleteCart = async (req, res) => {
  const { id } = req.body;
  const cart = await req.user.getCart();
  const cartProduct = await cart.getProducts({
    where: { id }
  });
  const product = cartProduct[0];
  await product.cartItem.destroy();
  return res.json({
    success: true,
    msg: `successfully removed ${product.title} from cart list.`
  });
};
