const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000
const app = express();
require('dotenv').config();
app.set('port', port);;
app.use(morgan("dev"));
app.use(cors());
app.use(cors({origin: '*',}));


module.exports = app;