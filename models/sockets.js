const TicketList = require('./ticket-list')
//AQui vamos a segmentar la logica de todos los metodos o eventos de los sockets en clases

class Sockets {

   constructor(io){

      this.io = io;

      this.ticketList = new TicketList();
      this.socketEvents();

      //podemos crear la instancia de nuestro TicketList aqui y llamarla como instancia de clase  

   }

   //este método va tener todos los eventos
   socketEvents(){

      //On connection es el que abre el socket 
      this.io.on('connection', (socket) => {

         console.log("cliente conectado")

      socket.on('solicitar-ticket', (_, callback) => {
         const ticketCreado = this.ticketList.crearTicket();
         callback(ticketCreado);
      })

      socket.on('siguiente-ticket-trabajar',(usuario,callback) => {
         const { agente, escritorio } = usuario;
         const suTicket = this.ticketList.asignarTicket(agente, escritorio); 
         callback(suTicket);

         this.io.emit('ticket-asignado', this.ticketList.ultimos13);
         
      })

   }); //fin this.io.on(''connection)
   }
} //fin clase Sockets

module.exports = Sockets;