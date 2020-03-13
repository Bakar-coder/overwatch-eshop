const fs = require('fs');
const {join} = require('path');
const pdfDocument = require('pdfkit');

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


exports.getInvoice = async (req, res) => {
  const { id } = req.body;
  const orders = await req.user.getOrders({ include: ['products'] });
  const order = orders.map(order => order.id === id);
  if (!order) return res.json({ success: false, msg: 'No Order found.'});
  if (order.userId !== req.user.id) return res.json({ success: false, msg: 'Unauthorized Access.'});
  const invoiceName = `invoice-${order.id}.pdf`;
  const invoicePath = join('data', 'invoices', invoiceName);
  const pdfDoc = new pdfDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="'+ invoiceName +'"');
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);
  pdfDoc.text('Hallo World.');
  pdfDoc.end();
}
