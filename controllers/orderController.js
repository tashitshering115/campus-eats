exports.createOrder = (req, res) => {
  const { itemName, price } = req.body;
  const order = { itemName, price, placedAt: new Date() };
  res.render('order_confirmation', { title: 'Order Confirmed', order });
};
