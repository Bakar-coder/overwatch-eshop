exports.getOrders = async (req, res) => {
  const orders = await req.user.getOrders({ include: ['products'] });
  res.json({ success: true, orders});
}


exports.postOrder = async (req, res) => {
  const cart = await req.user.getCart();
  const products = await cart.getProducts();
  const order = await req.user.createOrder();
  const result = await order.addProducts(
    products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    })
  );

  res.json({
    success: true,
    msg: 'Order submitted successfully.',
    Order: result
  });
  return cart.setProducts(null);
};
