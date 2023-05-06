const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json()); // para analizar los cuerpos de solicitud JSON
app.use(bodyParser.urlencoded({ extended: true })); // para analizar los cuerpos de solicitud codificados en URL
app.set('port', port);;
app.use(morgan("dev"));
app.use(cors());
app.use(cors({origin: '*',}));


app.use('', require('./src/routes/auth.routes'))

module.exports = app;