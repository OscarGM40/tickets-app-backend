//1---- Servidor de Express
const express = require("express");
const path = require("path");
const http = require("http");
//2----Servidor Socket
const socketio = require("socket.io");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    //Http server
    this.server = http.createServer(this.app);

    //Configuraciones de sockets
    this.io = socketio(this.server, {
      /*aqui podemos mandar configuraciones del socket server*/
    });

    //Inicializar sockets por motivos del REST
    this.sockets = new Sockets(this.io);
  }

  //funciones middleware irán en este método
  middlewares() {
    //indicamos el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    //habilitamos las CORS
    this.app.use(cors());

    //get de los ultimos tickets
    this.app.get("/ultimos", (req, res) => {
      res.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos13,
      });
    });
  } //fin middlewares

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  //vamos a extraer en clases la logica de los metodos socket
  /*    configurarSockets() {
      new Sockets(this.io)
   } */

  //este metodo levanta el servidor
  execute() {
    //Inicializar Middlewares
    this.middlewares();

    //Inicializar sockets
    // this.configurarSockets();

    //Inicializar Server
    this.server.listen(this.port, () => {
      console.clear();
      console.log(`Server corriendo en puerto: ${this.port}`);
    });
  }
}

//Como estamos trabajando en Node debemos exportarla con module.exports
//Si no hay asignacion es exportacion por defecto
module.exports = Server;
