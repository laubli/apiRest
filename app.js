// nmp i express --save
const express = require('express');
const app = express();

const objectRoute = require('./routes/object');

app.use('/api/object', objectRoute);


module.exports = app;