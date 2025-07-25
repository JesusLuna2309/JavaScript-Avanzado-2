// Definición de un texto extenso que se usará como dato de prueba
// Este texto largo (aproximadamente 2KB) simula una carga de datos sustancial
// que podría causar bloqueos en el hilo principal si se procesara directamente
let textMuyLargo = `Lorem ipsum dolor sit amet, consectetur 
adipiscing elit. Praesent massa sem, interdum sed vulputate id, 
hendrerit eget erat. Fusce tincidunt vulputate vestibulum. 
Proin aliquet semper urna ac eleifend. In vel risus nec mauris 
porttitor aliquam sed vitae magna. Nam condimentum vel neque 
vitae pulvinar. Etiam tristique ligula eu urna finibus dapibus. 
Praesent ut ipsum id turpis varius porta non id tortor. 
Pellentesque malesuada imperdiet mi. Mauris ac mauris quis turpis 
lobortis luctus. Nulla non felis pretium, ullamcorper sem in, aliquam 
sapien. Nulla viverra lacus ac enim mollis laoreet. Nunc tincidunt justo 
diam, at convallis nunc tempus a. Duis porttitor ullamcorper leo vel 
elementum. Morbi ac nulla sem. Maecenas non ullamcorper lorem. Integer 
faucibus tincidunt tellus, sed tincidunt diam iaculis sit amet.

Nullam nec pellentesque arcu, a bibendum velit. Mauris efficitur 
in ligula ac facilisis. Pellentesque ut nisi purus. Ut semper quis 
eros at egestas. Etiam eu lectus vel eros placerat molestie. Integer 
placerat quam quis urna tincidunt ultrices. Etiam purus mauris, 
rhoncus non scelerisque id, egestas et tortor. Quisque eu tincidunt 
turpis. Pellentesque lacinia, turpis in dignissim volutpat, ex libero 
viverra massa, at varius tellus massa vitae ex. Phasellus in mi sed 
eros molestie mollis. Pellentesque non arcu at urna aliquam aliquam. 
Proin euismod ligula massa. Praesent sed enim a ex volutpat fermentum 
non blandit turpis. Morbi ut ante purus.

Aliquam nec justo eget libero convallis dapibus. Proin et tristique 
arcu, eu gravida sapien. Quisque venenatis sapien sed commodo posuere. 
Curabitur placerat velit in commodo volutpat. Etiam maximus leo non 
sagittis volutpat. Donec quis quam eu nunc pellentesque vulputate in 
non nisi. Donec odio massa, mattis ut faucibus quis, molestie eu magna.

Proin enim arcu, convallis eget magna eget, maximus malesuada massa. 
Sed bibendum, lorem eu molestie congue, metus ex tincidunt dui, ac 
euismod nibh ligula vitae ipsum. Nam posuere libero sit amet pretium 
mollis. Vivamus maximus eget neque quis condimentum. Ut eu lacinia diam. 
Fusce rutrum efficitur erat quis aliquam. Cras scelerisque at est ut 
tristique. Maecenas sollicitudin dui quis erat vulputate cursus. 
Praesent feugiat vel arcu vitae feugiat. Maecenas condimentum gravida 
ipsum non accumsan. Proin congue libero sem, a tempus tellus consectetur 
eu. Nullam id quam nec velit blandit euismod. Donec dui sem, sodales vitae 
odio quis, posuere mollis massa. Cras sed ornare ipsum, et congue sapien. 
Nam sed justo vestibulum, scelerisque sem at, hendrerit ligula. Morbi 
ullamcorper congue nisl.

Aliquam vestibulum, augue at fringilla scelerisque, libero lorem 
fringilla sapien, a rhoncus nunc massa vel erat. Nullam vitae purus 
ornare, luctus urna vitae, volutpat magna. Maecenas venenatis ligula in 
tortor fringilla accumsan. Vestibulum ante ipsum primis in faucibus orci 
luctus et ultrices posuere cubilia Curae; Mauris aliquam est arcu, eget 
consectetur sem gravida nec. Morbi tempor eget magna in vehicula. Nam 
ullamcorper porta turpis ac interdum. Praesent at odio rutrum, tincidunt 
augue feugiat, scelerisque quam. Nullam at est sapien. Curabitur rutrum 
mauris metus, eget facilisis ligula lobortis sed. Integer rhoncus ipsum 
purus, ut faucibus dolor auctor eget.`

// Creación de una instancia de Web Worker
// Un Web Worker ejecuta código JavaScript en un hilo separado del hilo principal,
// permitiendo realizar tareas intensivas sin bloquear la interfaz de usuario
// La ruta './js/worker.js' es relativa a la ubicación del HTML que carga este script
const miWorker = new Worker('./js/worker.js');

// Envío de datos al worker mediante el método postMessage
// Se envía un objeto con dos propiedades:
// - tipo: identifica la operación que debe realizar el worker ("codificar")
// - mensaje: contiene el texto extenso que debe ser procesado
// Este método es asíncrono y no bloquea el hilo principal
miWorker.postMessage({tipo: "codificar", mensaje: textMuyLargo});

// Configuración del manejador de eventos para recibir respuestas del worker
// El evento 'message' se dispara cuando el worker envía datos de vuelta al hilo principal
// usando su propio método postMessage
miWorker.onmessage = function (e) {
    // e.data contiene el objeto enviado por el worker
    // Asumimos que el worker devuelve un objeto con una propiedad 'resultado'
    // que contiene el texto procesado o codificado
    console.log(e.data.resultado);
    
    // MEJORA POTENCIAL: Mostrar el resultado en la interfaz de usuario
    // document.getElementById('resultado').textContent = e.data.resultado;
    
    // MEJORA POTENCIAL: Medir y mostrar el tiempo de procesamiento
    // const tiempoFinal = performance.now();
    // console.log(`Procesamiento completado en ${tiempoFinal - tiempoInicial} ms`);
}

// MEJORA POTENCIAL: Configurar un manejador de errores para el worker
// miWorker.onerror = function(error) {
//   console.error('Error en el Web Worker:', error.message);
//   // Mostrar mensaje de error al usuario
//   document.getElementById('error').textContent = 'Error al procesar el texto';
// };

// MEJORA POTENCIAL: Función para terminar el worker cuando ya no sea necesario
// function terminarWorker() {
//   miWorker.terminate();
//   console.log('Worker terminado');
// }

