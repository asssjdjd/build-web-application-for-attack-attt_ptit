the structure of the project
my-app/
├── models/          # Models cho DB
│   ├── User.js
│   └── Product.js   # Model cho quần áo
├── routes/          # Routes API
│   ├── auth.js      # Đăng ký/đăng nhập
│   └── dashboard.js # Dashboard quản lý
├── views/           # Giao diện EJS
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── users.ejs    # Quản lý user
│   └── products.ejs # Quản lý quần áo
├── scripts/         # Script seed DB
│   └── seed.js
├── .env
├── app.js           # File chính
└── package.json


how to run this application 
1. install node js (from nodejs.org) download lts version and install
2. install mongodb (from mongodb.com) download community server and install
3. run this script "npm install express mongoose bcryptjs jsonwebtoken ejs body-parser cookie-parser dotenv"
4. run this script in wsl/linux/turminal to get this jwt_key : "openssl rand -hex 32"
openssl rand -hex 32
5. run "npm install" to install all dependencies
6. configure .env file with your mongodb uri and jwt secret key
7. run "node scripts/seed.js" to seed initial data
8. run "node app.js" to start the server
9. open browser and go to "http://localhost:3000/register" to register a
10. chạy thôi =)))) chức mừng em việt béo thành công =)))
11. đăng nhập vào "http://localhost:3000/login"
12. vào dashboard "http://localhost:3000/dashboard"
13. quản lý user "http://localhost:3000/dashboard/users"
14. quản lý quần áo "http://localhost:3000/dashboard/products"
Note: Remember to keep your .env file secure and do not expose it publicly.


// user : admin
// pass : admin123
// email : admin@example.com
# VietBeo Clothing Management System