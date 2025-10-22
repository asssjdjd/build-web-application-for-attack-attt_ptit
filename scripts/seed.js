const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    
    // Xóa cũ
    await User.deleteMany({});
    await Product.deleteMany({});
    
    // Tạo user mẫu
    const user = new User({ username: 'admin', email: 'admin@example.com', password: 'password123' });
    await user.save();
    
    // Tạo sản phẩm mẫu với doanh số
    const products = [
      { name: 'Áo thun', price: 200000, size: 'M', description: 'Áo cotton', sold: 120, revenue: 200000 * 120 },
      { name: 'Quần jean', price: 350000, size: 'L', description: 'Quần jean xanh', sold: 95, revenue: 350000 * 95 },
      { name: 'Áo khoác', price: 500000, size: 'XL', description: 'Áo khoác dạ', sold: 60, revenue: 500000 * 60 },
      { name: 'Váy', price: 300000, size: 'S', description: 'Váy xinh', sold: 80, revenue: 300000 * 80 },
      { name: 'Đầm', price: 450000, size: 'M', description: 'Đầm dự tiệc', sold: 45, revenue: 450000 * 45 },
      { name: 'Áo sơ mi', price: 220000, size: 'M', description: 'Sơ mi công sở', sold: 110, revenue: 220000 * 110 }
    ];
    await Product.insertMany(products);
    
    console.log('Database seeded');
    process.exit();
  })
  .catch(err => console.log(err));