const { Product } = require('../../models/Product');

exports.getCart = async (req, res) => {
  const cart = await req.user.getCart();
  const products = await cart.getProducts();
  res.json({ success: true, products });
};

exports.postAddCart = async (req, res) => {
  const { id } = req.body;
  let product;
  let newQuantity = 1;
  const cart = await req.user.getCart();
  const products = await cart.getProducts({
    where: { id }
  });
  if (products.length > 0) {
    product = products[0];
  }

  if (product) {
    const oldQuantity = product.cartItem.quantity;
    newQuantity = oldQuantity + 1;
    await cart.addProduct(product, {
      through: { quantity: newQuantity }
    });

    return res.json({
      success: true,
      msg: `Incremented ${product.title} by one.`,
      products
    });
  }

  product = await Product.findOne({ where: { id } });
  await cart.addProduct(product, {
    through: { quantity: newQuantity }
  });

  res.json({
    success: true,
    msg: `add ${product.title} to a shopping list.`,
    products
  });
};

exports.postDecrementCartItem = async (req, res) => {
  const { id } = req.body;
  let product;
  let newQuantity = 1;
  const cart = await req.user.getCart();
  const products = await cart.getProducts({
    where: { id }
  });

  product = products[0];
  const oldQuantity = product.cartItem.quantity;
  newQuantity = oldQuantity > 1 && oldQuantity - 1;
  await cart.addProduct(product, {
    through: { quantity: newQuantity }
  });

  return res.json({
    success: true,
    msg: `Incremented ${product.title} by one.`,
    products
  });
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
