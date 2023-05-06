const { getConnection } = require('./../database/database');
const bcrypt = require('bcrypt')
//Funcion para que un usuario sea registrado
const register = async (req, res) => {
    //Traemos los datos del body
    const { email, password, age } = req.body;

    try {
        //Creamos la fecha para almacenar el dia en que el usuario creo su cuenta
        const ahora = new Date();
        const date_Created = ahora;
        const last_entry = ahora;
        //Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);
        //Datos del usuario
        const user = {
            email,
            age,
            date_Created,
            last_entry
        }
        //Creamos la conexion a la base de datos
        const connection = await getConnection();
        //Verificamos que el usuario no este registrado ya.
        const result = await connection.query('SELECT email FROM users WHERE email = ?', email);
        if (result.length > 0) {
            console.log('1')
            res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }
        else {
            console.log('2')
            if (age < 8) {
                console.log('3')
                res.status(401).json({
                    ok: false,
                    msg: 'Porfavor pide a un adulto mayor que cree una cuenta por ti'
                })
            }
            else {
                console.log('4')
                const insertDate = await connection.query('INSERT INTO users SET ?', [user])
                console.log(result)
                if (!insertDate) {
                    console.log('5')
                    res.status(404).json({
                        ok: false,
                        msg: 'Error al crear el usuario'
                    })
                }
                else {
                    console.log('6')
                    res.status(202).json({
                        ok: true,
                        msg: 'Usuario creado con exito'
                    })
                }
            }
        }
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}
module.exports = {
    register
}