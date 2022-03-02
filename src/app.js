const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(require('./routes/index'))

app.use(express.static(path.join(__dirname, 'public')))//para que entre a la carpeta public

module.exports = app;