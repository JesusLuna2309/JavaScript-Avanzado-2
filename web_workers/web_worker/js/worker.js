/* worker.js */

// Variable que define el factor multiplicador/divisor usado en el algoritmo de codificación
// Este valor determina cuánto se modificará el código ASCII de cada carácter
// Un valor mayor genera una transformación más drástica del texto original
var valorClave = 4;

// Función que implementa un algoritmo simple de codificación por sustitución
// Recibe el mensaje de texto plano y devuelve una versión codificada
function codificarMensaje(mensaje) {
  // Inicializa una cadena vacía donde se irá construyendo el resultado
  let resultado = "";
  
  // Itera sobre cada carácter del mensaje
  // Se almacena la longitud (j) para evitar recalcularla en cada iteración del bucle
  // Esto es una optimización común especialmente útil en bucles que procesan grandes volúmenes de datos
  for(var i = 0, j = mensaje.length; i < j; i++){
    // Para cada carácter:
    // 1. Obtiene su código ASCII/Unicode con charCodeAt()
    // 2. Multiplica este código por valorClave
    // 3. Convierte el nuevo código numérico de vuelta a un carácter con fromCharCode()
    // 4. Añade este carácter transformado al resultado
    resultado += String.fromCharCode(mensaje.charCodeAt(i) * valorClave);
  }
  
  // Envía el resultado al hilo principal usando postMessage
  // El objeto { resultado } es equivalente a { resultado: resultado }
  // Este mensaje será recibido por el evento 'onmessage' en el código principal
  self.postMessage({ resultado });
}

// Función que implementa el algoritmo inverso de decodificación
// Funciona de manera similar a codificarMensaje pero dividiendo en lugar de multiplicar
function decodificarMensaje(mensaje) {
  // Inicializa la cadena de resultado
  let resultado = "";
  
  // Itera sobre cada carácter del mensaje codificado
  for(var i = 0, j = mensaje.length; i < j; i++){
    // El proceso es inverso al de codificación:
    // 1. Obtiene el código del carácter codificado
    // 2. Divide por valorClave para obtener el código original
    // 3. Convierte de vuelta a carácter
    // 4. Añade al resultado
    resultado += String.fromCharCode(mensaje.charCodeAt(i) / valorClave);
  }
  
  // Envía el resultado decodificado al hilo principal
  self.postMessage({ resultado });
  
  // NOTA: Este algoritmo asume que la división siempre dará como resultado
  // el código ASCII/Unicode original exacto. Esto funciona porque la multiplicación
  // anterior fue con un entero (4), pero podría haber problemas de precisión
  // si se usaran valores no enteros o si la división no fuera exacta.
}

// Configuración del manejador de mensajes entrantes desde el hilo principal
// 'self' se refiere al contexto global del Worker (equivalente a 'this' en el ámbito global)
// A diferencia del código del hilo principal, aquí no tenemos acceso a 'window'
self.onmessage = function(e) {
    // Verifica el tipo de operación solicitada examinando la propiedad 'tipo' del mensaje
    if(e.data.tipo == "codificar"){
        // Si es una solicitud de codificación, llama a la función correspondiente
        // pasando el mensaje a codificar
        codificarMensaje(e.data.mensaje);
    } else {
        // Para cualquier otro valor (asumiendo que es "decodificar"),
        // llama a la función de decodificación
        decodificarMensaje(e.data.mensaje);
        
        // CONSIDERACIÓN: Una implementación más robusta verificaría explícitamente
        // que e.data.tipo sea "decodificar" y manejaría cualquier otro valor como error
    }
    
    // NOTA: Este diseño procesa un mensaje a la vez y envía una respuesta inmediata.
    // Si se necesitara procesar múltiples mensajes en paralelo, se requeriría
    // un sistema más complejo de identificación y correlación de mensajes.
}

// EXTENSIONES POTENCIALES:
// 1. Implementar manejo de errores (try/catch) para operaciones que puedan fallar
// 2. Añadir capacidad para procesar diferentes tipos de datos (ej. ArrayBuffer para binarios)
// 3. Implementar algoritmos de cifrado más seguros y complejos
// 4. Añadir un sistema de ID de mensaje para correlacionar solicitudes y respuestas
// 5. Implementar un mecanismo de progreso para informar sobre el avance en mensajes largos