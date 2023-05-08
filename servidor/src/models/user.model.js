//! Las conexiones a la base de datos se hacen directamente desde el modelo

const config = require('./../config') // Configuraciones
const { Sequelize, Model, DataTypes } = require('sequelize') //? Sequilize para ORM

const sequelize = new Sequelize(
    config.database, // ---> instanciamos la base de datos
    config.user, // ---> le pasamos el nombre de usuario
    config.password,  // ---> y la contraseña
    {
        host: config.host, // ---> el host para la conexion
        dialect: "mysql", // ---> el tipo de motor de busqueda
        port: config.port
    }
)

//! Para probar la conexion a la base de datos:
async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Conectado a la base de datos');
    }
    catch(e) {
        console.log(e);
    }
}

testConnection()

//? Creamos la clase para el modelo
class User extends Model {}

//Creamos la tabla
User.init(
    {
        // COLUMNAS:
        id_user: {
            type: DataTypes.INTEGER, // ---> tipo de dato int
            primaryKey: true, // ---> llave primaria
            autoIncrement: true // ---> auto_increment
        },
        email: {
            type: DataTypes.STRING, // ---> tipo de dato string
            allowNull: false // ---> not null
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "read" // ---> valores por default
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user" // ---> valores por default
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // ---> valores por default
        }
    }, {
        sequelize,
        modelName: 'Users' //! El nombre del modelo
    }
)

module.exports = { User, sequelize }