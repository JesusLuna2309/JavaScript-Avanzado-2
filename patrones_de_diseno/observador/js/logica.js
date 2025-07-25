// EJEMPLO 1: EVENTOS DEL DOM - Implementación nativa del patrón observador
function clickHandler(event){
  alert("botón presionado!");
  // Elimina el listener después de la primera ejecución, convirtiéndolo en un evento de un solo uso
  event.target.removeEventListener('click', clickHandler);
}

// Añade el manejador de eventos al botón con id "btn"
document.getElementById("btn").addEventListener('click', clickHandler);

/////

// EJEMPLO 2: IMPLEMENTACIÓN PERSONALIZADA DEL PATRÓN PUBLISHER/SUBSCRIBER

class Publisher{
  // Usamos un Map para almacenar los eventos y sus suscriptores
  // El Map permite usar cualquier valor como clave (no solo strings como en objetos)
  // y proporciona métodos útiles como has(), get(), set()
  eventos = new Map();

  constructor(){}

  // Método para notificar a todos los suscriptores de un evento específico
  publicar(evento, valores){
    const suscriptores = this.eventos.get(evento);
    // Itera sobre cada suscriptor y llama a la función con los valores proporcionados
    suscriptores.forEach(sub=> sub(valores));
  }

  // Método para registrar una función como suscriptor de un evento específico
  suscribir(evento, func){
    if(!this.eventos.has(evento)){
      // Si es el primer suscriptor para este evento, creamos un nuevo array
      this.eventos.set(evento, [func]);
    }else{
      // Si ya existen suscriptores, añadimos el nuevo a la lista existente
      let sub = this.eventos.get(evento);
      sub.push(func);
      this.eventos.set(evento, sub);
    }
  }

  // Método para eliminar un suscriptor de un evento específico
  desvincular(evento, func){
    if(!this.eventos.has(evento)){
      // Si el evento no existe, no hacemos nada
      return;
    }
    let sub = this.eventos.get(evento);
    // Encontramos la posición de la función en el array y la eliminamos
    // NOTA: Esto podría fallar si la función no existe en el array (indexOf retornaría -1)
    sub.splice(sub.indexOf(func), 1);
    this.eventos.set(evento, sub);
  }
}

// Definimos dos funciones de suscriptor que simplemente muestran mensajes en la consola
function subscriptor1(mensaje){
  console.log("subscriptor1: "+mensaje);
}

function subscriptor2(mensaje){
  console.log("subscriptor2: "+mensaje);
}

// Creamos una instancia de nuestro Publisher
const publisher = new Publisher();

// Suscribimos ambas funciones al evento "mensaje"
publisher.suscribir("mensaje", subscriptor1);
publisher.suscribir("mensaje", subscriptor2);

// Publicamos el primer mensaje - ambos suscriptores lo recibirán
publisher.publicar("mensaje", "mi primer mensaje");
// Salida:
// subscriptor1: mi primer mensaje
// subscriptor2: mi primer mensaje

// Desvinculamos el primer suscriptor
publisher.desvincular("mensaje", subscriptor1);

// Publicamos el segundo mensaje - solo subscriptor2 lo recibirá
publisher.publicar("mensaje", "mi segundo mensaje");
// Salida:
// subscriptor2: mi segundo mensaje

// EJEMPLO 3: COMUNICACIÓN ENTRE COMPONENTES MEDIANTE EL BUS DE EVENTOS

// Clase que actúa como emisor de eventos
class A{
  constructor(bus){
    // Recibe el bus de eventos como dependencia
    this.eventBus = bus;
  }

  // Método que publica un evento para notificar a B
  notificarB(){
    this.eventBus.publicar("archivo-cargado", "mensaje de A para B");
  }
}

// Clase que actúa como receptor de eventos
class B{
  constructor(bus){
    // Recibe el bus de eventos como dependencia
    this.eventBus = bus;
    // Se suscribe inmediatamente al evento "archivo-cargado"
    // ATENCIÓN: Hay un problema potencial con 'this' en esta línea,
    // ya que el contexto 'this' se perderá cuando eventHandler sea llamado
    this.eventBus.suscribir("archivo-cargado", this.eventHandler);
  }
  
  // Método que se ejecutará cuando se reciba el evento
  eventHandler(mensaje){
    console.log(mensaje);
  }
}

// Creamos instancias de ambas clases, pasándoles el mismo bus de eventos
const a = new A(publisher);
const b = new B(publisher);

// Hacemos que A notifique a B
a.notificarB();
// El resultado esperado sería mostrar "mensaje de A para B" en la consola
// Sin embargo, debido al problema de contexto 'this', es probable que no funcione correctamente
