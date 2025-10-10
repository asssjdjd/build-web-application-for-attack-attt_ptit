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
router.get('/', authMiddleware, (req, res) => {
  res.render('dashboard');
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

// Thêm sản phẩm (example)
router.post('/products', authMiddleware, async (req, res) => {
  const { name, price, size, description } = req.body;
  try {
    const product = new Product({ name, price, size, description, createdBy: req.user.id });
    await product.save();
    res.redirect('/dashboard/products');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

module.exports = { router, authMiddleware };