require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express()
const PORT = process.env.PORT;
const User = require('./models/userModel.js')
const path = require("path");
const connectDB = require('./config/db.js');
const adminRouter = require('./routes/adminRoute.js');
const clintRouter = require('./routes/clintRoute.js');
const authRouter = require('./routes/authRoute.js');
const fs = require("fs");
connectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());


app.use('/admin', adminRouter);
app.use('/', clintRouter);
app.use('/auth', authRouter);

app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect("/");
})


app.listen(PORT, () => {
  console.log("Server started...");
  console.log(`http://localhost:${PORT}`);
})