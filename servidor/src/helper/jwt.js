const jwt = require('jsonwebtoken')

const jwt_generator = (uid) => {
    return new Promise((resolve, rejected) => {
        const payload = { uid }
        jwt.sign(payload, process.env.secret, (e, token) => {
            if(e) {
                rejected
            }
            else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    jwt_generator
}