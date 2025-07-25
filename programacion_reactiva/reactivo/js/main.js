// FLUJO 1: DETECCIÓN DE CLICS Y CONTEO DE PUNTOS
// Crea un flujo Observable que emite eventos cuando ocurre un clic en cualquier parte del documento
rxjs.fromEvent(document, 'click').pipe(
  // Extrae la propiedad 'target' del evento, que es el elemento DOM que recibió el clic
  // Esto transforma el flujo de eventos completos a un flujo de elementos DOM
  rxjs.operators.pluck('target'),
  
  // Filtra el flujo para mantener solo los elementos que tienen la clase 'ball'
  // De esta manera, solo procesamos clics en las pelotas, ignorando clics en cualquier otro lugar
  rxjs.operators.filter(node => node.classList.contains('ball')),
  
  // Acumula un contador que aumenta en 1 cada vez que pasa un elemento por el flujo
  // El segundo parámetro (0) es el valor inicial del contador
  // 'scan' es similar a 'reduce' en arrays, pero emite cada valor intermedio
  rxjs.operators.scan(counter => counter + 1, 0)
  
// Al suscribirnos al flujo resultante, recibimos el valor actual del contador cada vez que cambia
).subscribe(counter=>{
  // Actualizamos el DOM con el nuevo valor del contador
  // Este es el único lugar donde modificamos el DOM como resultado del conteo
  document.getElementById("counter").innerText = "Puntos: "+counter;
});

// FLUJO 2: ELIMINACIÓN DE PELOTAS AL TERMINAR SU ANIMACIÓN
// Crea un flujo Observable que emite eventos cuando termina cualquier animación en el documento
rxjs.fromEvent(document, 'animationend').pipe(
  // Extrae el elemento que terminó su animación
  rxjs.operators.pluck('target'),
  
  // Filtra para mantener solo los elementos con clase 'ball'
  // Esto asegura que solo procesamos el fin de animación de nuestras pelotas
  rxjs.operators.filter(node => node.classList.contains('ball'))
  
// Al suscribirnos, recibimos cada elemento pelota que terminó su animación
).subscribe( node=> 
  // Eliminamos la pelota del DOM, liberando memoria y evitando acumulación de elementos
  document.body.removeChild(node)
);

// Función utilitaria para generar números aleatorios enteros entre 0 y max-1
// Esta es una función pura sin efectos secundarios
function randomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// FLUJO 3: CREACIÓN PERIÓDICA DE NUEVAS PELOTAS
// Crea un flujo Observable que emite un valor (el índice) cada 300 milisegundos
rxjs.interval(300).pipe(
  // Transforma cada emisión (que sería simplemente un número incremental)
  // en un nuevo elemento pelota con propiedades aleatorias
  rxjs.operators.map(()=>{
    // Crea un nuevo elemento div
    let ball = document.createElement("div");
    
    // Asigna la clase 'ball' para aplicar los estilos CSS correspondientes
    ball.className = "ball";
    
    // Genera un color RGB aleatorio para cada pelota
    // Cada componente (R, G, B) es un número entre 0 y 255
    ball.style.backgroundColor = "rgb(" + randomNum(255) + "," + randomNum(255) + "," + randomNum(255) + ")";
    
    // Posiciona la pelota en una ubicación vertical aleatoria (hasta 350px desde arriba)
    ball.style.top = randomNum(350) + "px";
    
    // Posiciona la pelota en una ubicación horizontal aleatoria (hasta 1550px desde la izquierda)
    ball.style.left = randomNum(1550) + "px";
    
    // Devuelve el elemento pelota completamente configurado
    return ball;
  })
  
// Al suscribirnos, recibimos cada nueva pelota generada y la añadimos al DOM
).subscribe(ball=> document.body.appendChild(ball));



