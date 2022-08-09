const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./util/database');

const app = express();

// Connect to mongoDb
dbConnect()
  .then((result) => {
    app.listen(3001);
    console.log('Connected');
  })
  .catch((err) => console.log(err));
