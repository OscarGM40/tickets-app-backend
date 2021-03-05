// Pedimos la clase Server: Contiene todo el servidor de express + socket.io configurado
const Server = require('./models/server');

// Paquete para leer y establecer las variables de entorno
require('dotenv').config();

// Inicializar la instancia de la clase Server
const server = new Server();

// Ejecutar el server,que es el que arranca todo
server.execute();