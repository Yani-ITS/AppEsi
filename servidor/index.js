const app = require("./app");
require('dotenv').config();

const main = () => {
    app.listen(app.get('port'));
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
}

main();