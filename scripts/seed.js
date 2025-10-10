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
    
    // Tạo sản phẩm mẫu
    const product = new Product({ name: 'Áo thun', price: 200000, size: 'M', description: 'Áo cotton' });
    await product.save();
    
    console.log('Database seeded');
    process.exit();
  })
  .catch(err => console.log(err));