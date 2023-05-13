const jwt = require('jsonwebtoken')

const jwt_validate = (req, res, next) => {
    const token = req.headers.authorization //* Obtenemos el token desde el header

    if(!token) { //! Si no hay token, no tiene acceso
        return res.status(401).json({
            ok: false,
            msg: 'Acceso denegado'
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.secret)
        req.id = id
        next() //? Si todo esta OK, continua
    }
    catch(e) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido!'
        })
    }
}

module.exports = jwt_validate