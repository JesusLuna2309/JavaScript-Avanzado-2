/**
 * Convierte todos los píxeles de una imagen a color negro
 * @param {Uint8ClampedArray} data - Array de datos de píxeles de la imagen
 */
function cambiarANegro(data) {
  // Recorremos el array de 4 en 4 (R,G,B,A para cada píxel)
  for (var i = 0; i < data.length; i+= 4) {
    // Establecemos a 0 los canales RGB (negro)
    data[i] = 0;     // Canal rojo = 0
    data[i+1] = 0;   // Canal verde = 0
    data[i+2] = 0;   // Canal azul = 0
    // Nota: No modificamos data[i+3] que es el canal alpha (transparencia)
  }
}

/**
 * Invierte los colores de cada píxel de la imagen usando XOR
 * @param {Uint8ClampedArray} data - Array de datos de píxeles de la imagen
 */
function invertirColores(data) {
  for (var i = 0; i < data.length; i+= 4) {
    // Usamos XOR (^) con 255 para invertir cada valor
    // Si el valor es x, entonces (x ^ 255) = 255 - x
    // Por ejemplo: 0 -> 255, 255 -> 0, 100 -> 155
    data[i] = data[i] ^ 255;     // Invertimos canal rojo
    data[i+1] = data[i+1] ^ 255; // Invertimos canal verde
    data[i+2] = data[i+2] ^ 255; // Invertimos canal azul
    // No modificamos el canal alpha
  }
}

/**
 * Convierte una imagen a escala de grises
 * @param {Uint8ClampedArray} data - Array de datos de píxeles de la imagen
 */
function blancoNegro(data) {
  for (var i = 0; i < data.length; i+= 4) {
    // Aplicamos la fórmula de luminosidad ponderada según la sensibilidad del ojo humano:
    // - 30% del canal rojo
    // - 59% del canal verde (el ojo humano es más sensible al verde)
    // - 11% del canal azul
    let gris = data[i] * .3 + data[i+1] * .59 + data[i+2] * .11;
    
    // Asignamos el mismo valor de gris a los tres canales RGB
    data[i] = gris;     // Canal rojo
    data[i+1] = gris;   // Canal verde
    data[i+2] = gris;   // Canal azul
    // No modificamos el canal alpha
  }
}

/**
 * Función principal que se ejecuta al cargar la página
 * Inicializa el canvas y aplica una transformación a la imagen
 */
function iniciar(){
  // Obtenemos referencias a los elementos del DOM
  let source = document.getElementById("source");    // Imagen fuente
  let canvas = document.getElementById("canvas");    // Elemento canvas para dibujar
  let contexto = canvas.getContext('2d');           // Contexto 2D para manipular el canvas
  
  // Ajustamos las dimensiones del canvas para que coincidan con la imagen
  canvas.width = source.width;
  canvas.height = source.height;
  
  // Dibujamos la imagen original en el canvas
  contexto.drawImage(source, 0, 0);
  
  // Obtenemos los datos de píxeles de la imagen
  // Estos datos se almacenan en un Uint8ClampedArray, donde cada píxel
  // está representado por 4 valores consecutivos: R, G, B, A
  // R: Rojo (0-255), G: Verde (0-255), B: Azul (0-255), A: Alpha/transparencia (0-255)
  let imgData = contexto.getImageData(0, 0, canvas.width, canvas.height);
  
  // Aplicamos la transformación a negro a los datos de la imagen
  // Podríamos cambiar esta función por invertirColores() o blancoNegro()
  // para obtener diferentes efectos
  cambiarANegro(imgData.data);
  
  // Dibujamos los datos modificados de vuelta en el canvas
  contexto.putImageData(imgData, 0, 0);
}

// Registramos el evento 'load' para ejecutar la función iniciar
// cuando la página termine de cargar
window.addEventListener('load', iniciar);