const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//* Express
const app = express();

//* Routes
const authRoutes = require('./routes/auth.routes')

//* Cors
app.use(cors());
app.use(cors({origin: '*',}));

//* Middlewares
app.use(morgan("dev"));

//* Settings
app.set('port', 3000);
app.use(express.json()); // para analizar los cuerpos de solicitud JSON
app.use(express.urlencoded({ extended: true })); // para analizar los cuerpos de solicitud codificados en URL


app.use(
    // ! Routes
    authRoutes
)

module.exports = app;