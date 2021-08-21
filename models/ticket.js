// ojo que me traigo a v4 pero con el nombre de uuidv4
const { v4: uuidv4 } = require('uuid');

class Ticket {
   
   constructor( numero ){
      this.id         = uuidv4();
      this.numero     = numero;
      this.escritorio = null;
      this.agente     = null;  
   }
}

//recuerda que module.exports exporta por defecto
module.exports = Ticket;