const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');
const router = express.Router();

// Middleware kiểm tra auth (sẽ dùng ở app.js)
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

// Dashboard chính
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Lấy top 5 sản phẩm theo doanh số (revenue)
    const topByRevenue = await Product.find({}).sort({ revenue: -1 }).limit(5).lean();
    // Lấy top 5 sản phẩm theo số lượng bán
    const topBySold = await Product.find({}).sort({ sold: -1 }).limit(5).lean();
    res.render('dashboard', { topByRevenue, topBySold });
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});

// Quản lý user
router.get('/users', authMiddleware, async (req, res) => {
  const users = await User.find({});
  // view file is `user.ejs` in the project
  res.render('user', { users });
});

// Quản lý quần áo
router.get('/products', authMiddleware, async (req, res) => {
  const products = await Product.find({});
  // view file is `product.ejs` in the project
  res.render('product', { products });
});

// Thêm sản phẩm
router.post('/products', authMiddleware, async (req, res) => {
  const { name, price, size, description, sold } = req.body;
  try {
    const soldCount = parseInt(sold) || 0;
    const priceNum = parseFloat(price) || 0;
    const revenue = priceNum * soldCount;
    
    const product = new Product({ 
      name, 
      price: priceNum, 
      size, 
      description, 
      sold: soldCount,
      revenue: revenue,
      createdBy: req.user.id 
    });
    await product.save();
    res.redirect('/dashboard/products');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

module.exports = { router, authMiddleware };