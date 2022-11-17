// nmp i express --save
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
// const jsw = require('jsonwebtoken');

const app = express();
app.use(helmet());
app.use(compression());

const DB = 'mongodb+srv://dbUser:rDeuwctFPqBKVu2a@cluster0.6yjlk5l.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('Connecter mongoDB'))
    .catch((err) => { console.log('erreur mongoDB' , err)
    });

app.use(bodyParser.json());

const objectRoute = require('./routes/object');
const userRoute = require('./routes/user');

app.use('/api/object', objectRoute);
app.use('/api/user', userRoute);

module.exports = app;

/*
navigator.storage
window.sessionStorage
window.localStorage*/
