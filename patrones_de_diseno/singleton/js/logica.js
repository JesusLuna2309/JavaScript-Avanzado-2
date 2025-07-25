//Objetos literales son Singleton
// NOTA: Este comentario es incorrecto. Los objetos literales NO son Singletons.
// Cada objeto literal crea una nueva instancia independiente.
const cuadrado = {
  largoLados: 40,
  calcularArea(){
    // NOTA: Este cálculo es incorrecto para un cuadrado.
    // Debería ser this.largoLados * this.largoLados
    return this.largoLados * 2;
  }
}

const cuadrado2 = {
  largoLados: 40,
  calcularArea(){
    // El mismo error de cálculo se repite aquí
    return this.largoLados * 2;
  }
}

// ERROR TIPOGRÁFICO: debería ser "cuadrado" en lugar de "cuandrado"
// Esta línea causaría un error de referencia en tiempo de ejecución
cuandrado === cuadrado2 //false

//Singleton con una función IIFE
// Esta es la implementación correcta del patrón Singleton usando una IIFE
// (Immediately Invoked Function Expression)
var Singleton = (function() {
  // Este ámbito funciona como un "espacio privado" donde podemos definir
  // variables y funciones que no serán accesibles desde fuera

  //Métodos y propiedades privados:
  // Esta variable solo es accesible dentro de la IIFE
  var valorClave = 4;

  // Función privada que implementa un cifrado muy simple
  // Multiplica el valor ASCII de cada carácter por valorClave
  function codificarMensaje (mensaje) {
    let resultado = "";
    for(var i = 0, j = mensaje.length; i < j; i++){
      resultado += String.fromCharCode(mensaje.charCodeAt(i) * valorClave);
    }
    return resultado;
  }

  // Función privada que implementa el descifrado
  // Divide el valor ASCII de cada carácter por valorClave
  function decodificarMensaje (mensaje) {
    let resultado = "";
    for(var i = 0, j = mensaje.length; i < j; i++){
      resultado += String.fromCharCode(mensaje.charCodeAt(i) / valorClave);
    }
    return resultado;
  }

  // Solo este objeto retornado será accesible desde fuera
  // Constituye la "interfaz pública" del Singleton
  return { // Métodos publicos
    ocultarMensaje: function (mensaje) {
      return codificarMensaje(mensaje)
    },
    leerMensaje: function (mensaje) {
      return decodificarMensaje(mensaje);
    }
  };
})(); // Los paréntesis al final ejecutan inmediatamente la función anónima

// Uso del Singleton para codificar un mensaje
let mensajeOculto = Singleton.ocultarMensaje("mi mensaje");
console.log(mensajeOculto); // Muestra el mensaje codificado (caracteres ilegibles)

// Uso del Singleton para decodificar el mensaje previamente codificado
let mensajeDesifrado = Singleton.leerMensaje(mensajeOculto);
console.log(mensajeDesifrado); // Muestra "mi mensaje"