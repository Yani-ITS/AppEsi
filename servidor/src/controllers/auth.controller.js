const { User, sequelize } = require("./../models/user.model")
const bcrypt = require('bcrypt')

//Funcion para que un usuario sea registrado
const register = async (req, res) => {

    await User.sync() //! Si la tabla no se creo, la crea

    const transaction = await sequelize.transaction() //! Manejo de transacciones para consultas

    //Traemos los datos del body
    const { email, pass, birthdate } = req.body;

    try {

        //! Corroboramos que el email no este ya registrado:
        const result = await User.findOne({ where: { email: email } })
        if (result != null) { // Si devuelve un registro

            res.status(400).json({ // Tira error
                ok: false,
                msg: 'El usuario ya existe'
            })
            await transaction.rollback() // Hacer un rollback

            return // Cortamos la secuencia
        }

        //! -------------------- Creamos el usuario ---------------------
        //? Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(pass, salt);
        
        // Creamos el usuario
        const user = await User.create({
            email: email,
            pass: passwordHash,
            birthdate: birthdate
        }, { transaction: transaction })

        res.status(201).json({
            ok: true,
            user,
            msg: 'Creado con éxito'
        })

        await transaction.commit() // Si todo OK, commitea los cambios
        
        // TODO: Ver si necesitamos esta parte (¿el usuario se registra solo o crean la cuenta?)
        /* else {
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
        }*/
    } 
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'Error en el servidor'
        })
        await transaction.rollback()
    }
}
module.exports = {
    register
}