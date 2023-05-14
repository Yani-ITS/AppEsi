require('dotenv').config();

module.exports = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: 'root',
    password: process.env.PASSWORD,
    port: process.env.PORT
}