// nmp i express --save
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const compression = require('compression');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(helmet());
app.use(compression());

const DB = 'mongodb+srv://ynov-test:ynov123@cluster0.vvo06a3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB Error connect', err));

app.use(bodyParser.json());


const objectRoute = require('./routes/object');
const userRoute = require('./routes/user');

app.use('/api/object', objectRoute);
app.use('/api/user', userRoute);


module.exports = app;