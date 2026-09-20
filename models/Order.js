const db = require('../config/db');

// CREATE: Uses db.tx transaction to insert order and bump times_ordered atomically
exports.createOrder = (menuItemId, price) => {
  return db.tx(async (t) => {
    const order = await t.one(
      'INSERT INTO orders (menu_item_id, quantity, price_at_order) VALUES ($1, 1, $2) RETURNING *',
      [menuItemId, price]
    );
    await t.none(
      'UPDATE menu_items SET times_ordered = times_ordered + 1 WHERE id = $1',
      [menuItemId]
    );
    return order;
  });
};

// READ: Retrieves order joined with menu_items to get item name
exports.getOrderById = (id) => {
  return db.oneOrNone(
    `SELECT orders.*, menu_items.name AS item_name
     FROM orders
     JOIN menu_items ON orders.menu_item_id = menu_items.id
     WHERE orders.id = $1`,
    [id]
  );
};

// UPDATE: Modifies quantity
exports.updateQuantity = (id, quantity) => {
  return db.one('UPDATE orders SET quantity = $1 WHERE id = $2 RETURNING *', [quantity, id]);
};

// DELETE: Removes order row
exports.cancelOrder = (id) => {
  return db.none('DELETE FROM orders WHERE id = $1', [id]);
};

// AGGREGATION: Summary stats for homepage
exports.getStats = () => {
  return db.one(`
    SELECT COUNT(*) AS total_orders,
           COALESCE(SUM(price_at_order * quantity), 0) AS total_revenue
    FROM orders
  `);
};

// AGGREGATION: Top 3 ordered items
exports.getPopularItems = () => {
  return db.any(`
    SELECT name, times_ordered
    FROM menu_items
    WHERE times_ordered > 0
    ORDER BY times_ordered DESC
    LIMIT 3
  `);
};