// Variable global que almacena la puntuación del usuario
// Este es un enfoque imperativo típico donde el estado se gestiona mediante una variable mutable
var counter = 0;

// Función que incrementa el contador y actualiza el DOM con el nuevo valor
// Ejemplifica la manipulación directa del DOM característica de la programación imperativa
function addPoint(){
  // Incrementa la variable global counter
  counter++;
  
  // Selecciona el elemento con id "counter" y modifica su contenido
  // Este es un ejemplo de manipulación directa del DOM, donde se indica exactamente QUÉ y CÓMO cambiar
  document.getElementById("counter").innerText = "Puntos: "+counter;
}

// Función utilitaria para generar números aleatorios enteros entre 0 y max-1
// Esta función pura no tiene efectos secundarios y siempre devuelve el mismo resultado para la misma entrada
function randomNum(max) {
  // Math.random() genera un número decimal entre 0 (inclusivo) y 1 (exclusivo)
  // Al multiplicarlo por max y aplicar Math.floor, obtenemos un entero entre 0 y max-1
  return Math.floor(Math.random() * Math.floor(max));
}

// Función principal que crea un elemento "pelota" con propiedades aleatorias
// Esta función tiene múltiples efectos secundarios: crea elementos DOM y adjunta eventos
function createBall(){
  // Crea un nuevo elemento div que representará la pelota
  let ball = document.createElement("div");
  
  // Asigna la clase CSS "ball" al elemento
  // Esta clase probablemente contenga estilos para la animación y apariencia básica
  ball.className = "ball";
  
  // Asigna un color de fondo aleatorio usando valores RGB entre 0-255
  // Cada llamada a randomNum genera un componente del color (rojo, verde, azul)
  ball.style.backgroundColor = "rgb(" + randomNum(255) + "," + randomNum(255) + "," + randomNum(255) + ")";
  
  // Posiciona la pelota aleatoriamente en el eje vertical (hasta 350px desde arriba)
  // Esto limita la aparición de pelotas a los primeros 350px de la página
  ball.style.top = randomNum(350) + "px";
  
  // Posiciona la pelota aleatoriamente en el eje horizontal (hasta 1550px desde la izquierda)
  // Esto distribuye las pelotas a lo largo de un área amplia horizontalmente
  ball.style.left = randomNum(1550) + "px";
  
  // Añade un evento de clic a la pelota que incrementará el contador cuando el usuario haga clic
  // Este es un ejemplo de manipulación directa de eventos del DOM
  ball.addEventListener("click", addPoint);
  
  // Añade un evento para detectar cuando la animación termina
  // La función anónima elimina la pelota del DOM cuando esto ocurre, liberando memoria
  ball.addEventListener("animationend", function(event){
    // event.target es el elemento que disparó el evento (la pelota en este caso)
    document.body.removeChild(event.target);
  });
  
  // Finalmente, añade la pelota al body del documento para que sea visible
  document.body.appendChild(ball);
}

// Configura un intervalo que ejecuta la función createBall cada 300 milisegundos
// Esto crea un flujo continuo de pelotas que aparecen cada 0.3 segundos
// NOTA: Este intervalo nunca se detiene, lo que podría causar problemas de rendimiento en sesiones largas
setInterval(createBall, 300);

