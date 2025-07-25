/**
 * Convierte una imagen a escala de grises
 * @param {Uint8ClampedArray} data - Array de datos de la imagen donde cada píxel
 * está representado por 4 valores consecutivos (R, G, B, A)
 * @returns {Uint8ClampedArray} - Array de datos modificado en escala de grises
 */
function blancoNegro(data) {
  // Iteramos de 4 en 4 porque cada píxel tiene 4 componentes: R, G, B y A (alpha/transparencia)
  for (var i = 0; i < data.length; i+= 4) {
    // Fórmula de luminosidad ponderada para convertir a escala de grises
    // Esta fórmula refleja la sensibilidad del ojo humano a diferentes colores
    // 30% del rojo + 59% del verde + 11% del azul
    let gris = data[i] * .3 + data[i+1] * .59 + data[i+2] * .11;
    
    // Reemplazamos los valores R, G y B con el valor de gris calculado
    data[i] = gris;     // Canal rojo
    data[i+1] = gris;   // Canal verde
    data[i+2] = gris;   // Canal azul
    // Nota: No modificamos data[i+3] que es el canal alpha (transparencia)
  }
  return data;
}

/**
 * Transforma una imagen a escala de grises y prepara su descarga
 * @param {HTMLImageElement} image - Elemento imagen a transformar
 */
async function transformarDescargar(image){
  // Obtenemos referencia al elemento canvas del DOM
  let canvas = document.getElementById("canvas");
  // Obtenemos el contexto 2D del canvas para manipular la imagen
  let contexto = canvas.getContext('2d');
  
  // Ajustamos las dimensiones del canvas a las de la imagen
  canvas.width = image.width;
  canvas.height = image.height;
  
  // Dibujamos la imagen en el canvas en la posición (0,0)
  contexto.drawImage(image, 0, 0);
  
  // Obtenemos los datos de la imagen (matriz de píxeles)
  let imgData = contexto.getImageData(0, 0, canvas.width, canvas.height);
  
  // Aplicamos el filtro de escala de grises a los datos de la imagen
  blancoNegro(imgData.data);
  
  // Colocamos los datos modificados de vuelta en el canvas
  contexto.putImageData(imgData, 0, 0);

  // Convertimos el canvas a una URL de datos en formato PNG
  // y cambiamos el tipo MIME para que el navegador lo trate como archivo descargable
  let url = canvas.toDataURL("image/png")
  .replace("image/png", "image/octet-stream");
  
  // Configuramos el enlace de descarga con la URL generada
  const descarga = document.getElementById("descarga");
  descarga.setAttribute("href", url);
}

// Cargamos una imagen desde el servidor mediante fetch
fetch("../img/img1.jpg")
.then(response => response.blob()) // Convertimos la respuesta a un objeto Blob
.then(blob => {
    // Creamos una URL temporal para el Blob
    let url = URL.createObjectURL(blob);
    
    // Creamos un elemento de imagen dinámicamente
    let imgTag = document.createElement("img");
    
    // Configuramos el evento onload para procesar la imagen una vez cargada
    imgTag.onload = () => {
      // Llamamos a la función que transforma la imagen y prepara su descarga
      transformarDescargar(imgTag);
    };
    
    // Asignamos la URL del Blob como fuente de la imagen
    imgTag.src = url;
    
    // Añadimos la imagen al DOM para visualizarla
    document.body.appendChild(imgTag);
});