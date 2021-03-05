   //Vamos a tener una clase que se encargue de manejar todos los tickets 
//requerimos la clase
   const Ticket = require('./ticket')

   class TicketList {

      constructor() {
         this.ultimoNumero = 0;

         //cuando asignemos un ticket lo movemos de el arreglo de pendientes a asignados.
         this.pendientes = [];
         this.asignados  = [];
      }
      //puedo declarar un getter en js con get funtion(){}
      get siguienteNumero() {
         this.ultimoNumero ++;
         return this.ultimoNumero; 
      }

      // 3 que se verán más diez en el historial
      get ultimos13(){
         return this.asignados.slice(0,13)
      }

      // método de instancia
      crearTicket(){
         const nuevoTicket =new Ticket( this.siguienteNumero );
         this.pendientes.push( nuevoTicket );
         return nuevoTicket;
      }

      // este metodo asigna al ticket sus cosas
      asignarTicket(agente,escritorio){   
         
         if(this.pendientes.length === 0){
            return null;
         }

         //cogemos con shift desde el primero, no con pop el ultimo
         const siguienteTicket = this.pendientes.shift();

         siguienteTicket.agente = agente;
         siguienteTicket.escritorio = escritorio;
         //insertamos con unshift al principio,no con push
         this.asignados.unshift( siguienteTicket );

         return siguienteTicket;

      }

      
   }

   module.exports = TicketList;