//crear  modulos a travez de objetos literales:

var miModuloL = {
  unaPropiedad: 'con un valor',  // Propiedad pública del módulo
  // un método básico
  unMetodo: function () {        // Método público del módulo
    console.log("Método que ejecuta una acción");
  }
};
miModuloL.unaPropiedad = "Un nuevo valor";  // Modificación directa de la propiedad
miModuloL.unMetodo();  // Llamada al método del módulo


//crear modulos a travez de IIFE (Immediately Invoked Function Expression)

var moduloIIFE = (function () {  // Función anónima que se ejecuta inmediatamente
  //propiedades privadas - inaccesibles desde fuera del módulo
  var counter = 0;  // Esta variable solo es accesible dentro del ámbito de la función
  
  //metodos privados - solo pueden ser llamados dentro del módulo
  function incrementar(){  // Función privada para incrementar el contador
    counter++;
  }

  function decrementar(){  // Función privada para decrementar el contador
    counter--;
  }

  // El objeto retornado se convierte en la API pública del módulo
  return {
    // Método público que utiliza funciones privadas según el parámetro recibido
    modificarEstado: function (direccion) {
      if(direccion == "arriba"){
        incrementar();  // Llama a la función privada
      }else if(direccion == "abajo"){
        decrementar();  // Llama a la función privada
      }
    },
    // Método público para reiniciar el contador privado
    reiniciar: function () {
      counter = 0;  // Modifica la variable privada
    },
    // Método público para obtener el valor actual del contador privado
    // Utiliza la sintaxis de método abreviada de ES6
    obtenerValorActual(){
      return counter;  // Accede a la variable privada
    }
  };
})();  // Los paréntesis al final ejecutan la función inmediatamente


// Prueba del módulo IIFE
console.log(moduloIIFE.obtenerValorActual());  // Muestra 0 (valor inicial)
moduloIIFE.modificarEstado("arriba");  // Incrementa counter a 1
moduloIIFE.modificarEstado("arriba");  // Incrementa counter a 2
moduloIIFE.modificarEstado("arriba");  // Incrementa counter a 3
moduloIIFE.modificarEstado("abajo");   // Decrementa counter a 2
console.log(moduloIIFE.obtenerValorActual());  // Muestra 2 (valor final)


//definición de módulos en ES6
import { obtenerPropiedad, unaPropiedadPrivada} from "./modulo.js"  // Importa exportaciones específicas

// ERROR: actualizarPropiedad no ha sido importada, esto causará un error
actualizarPropiedad(1000);  // Debería ser una función importada del módulo
console.log(obtenerPropiedad())  // Muestra el valor obtenido del módulo importado




