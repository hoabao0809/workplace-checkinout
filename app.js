const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConnect = require('./util/database');
const userRoutes = require('./routes/index');
const User = require('./models/user');

const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Define Static Folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('62f258c5f303a1cb52676250')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Routes
app.use(userRoutes);

// Connect to mongoDb
dbConnect()
  .then((result) => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: 'Đặng Nguyễn Bảo Hòa',
            doB: new Date('1996-09-08'),
            salaryScale: 1,
            startDate: new Date('2022-01-01'),
            department: 'IT',
            annualLeave: 13,
            image: '/assets/images/avatar.png',
          });
          user.save();
        }
        app.listen(3001);
        console.log('Connected');
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
