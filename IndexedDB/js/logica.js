/*

Ejemplo de como crear una base de datos y un object store:

let db;

function abrirBasesDeDatos() {
  let peticion = indexedDB.open('todos', 1);

  peticion.onsuccess = e => {
    db = e.target.result;
    console.log("Se ha abierto la base de datos");
    db.close();
    crearObjectStore();
  }
  peticion.onerror = e => {
    console.error("Se ha producido un error", e);
  }
}

abrirBasesDeDatos(); 



function crearObjectStore() {
  let peticion = indexedDB.open('todos', 2);
  peticion.onupgradeneeded = function (event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("listaTareas", {
      keyPath: 'id'
    });
  };
}

*/

//////////////////////////////////////////////////////////////////

// Variable global para almacenar la conexión a la base de datos
let db;

// Array con los datos de prueba que se insertarán en la base de datos
// Cada objeto tiene un id único que servirá como clave primaria (keyPath)
let datosAGuardar = [
  { id: "tarea_1", titulo: "Compras", descripcion: "Hacer las compras" },
  { id: "tarea_2", titulo: "Estudiar", descripcion: "Estudiar para el exéamen" },
  { id: "tarea_3", titulo: "Cocinar", descripcion: "Hacer la cena" },
  { id: "tarea_4", titulo: "Gimnasio", descripcion: "Ir al gimnacio por una hora" },
];

/**
 * Función para abrir la conexión a la base de datos
 * - Versión 2: Ya debe tener la estructura con el object store "listaTareas"
 * - Cuando la conexión se establece con éxito, se llama a leerTodasLasTareas()
 */
function abrirBasesDeDatos() {
  // Solicita abrir la base de datos 'todos' en su versión 2
  // Si la base de datos no existe, la crea
  let peticion = indexedDB.open('todos', 2);

  // Evento que se dispara cuando la conexión se establece exitosamente
  peticion.onsuccess = e => {
    // Guardamos la referencia a la base de datos en la variable global
    db = e.target.result;
    console.log("Se ha abierto la base de datos");
    // Una vez abierta, llamamos a la función que lee todas las tareas
    leerTodasLasTareas();
  }
  
  // Evento que se dispara si ocurre algún error al abrir la conexión
  peticion.onerror = e => {
    console.error("Se ha producido un error", e);
  }
  
  // NOTA: Falta el evento onupgradeneeded que normalmente crearía la estructura
  // Se asume que la base de datos ya ha sido creada previamente con su estructura
}

/**
 * Función para guardar los datos de prueba en la base de datos
 * Añade todos los objetos del array datosAGuardar al object store
 */
function guardarDatos() {
  // Iniciamos una transacción en modo "readwrite" (lectura/escritura)
  // sobre el object store "listaTareas"
  let listaTareas = db.transaction("listaTareas", "readwrite").objectStore("listaTareas");
  
  // Recorremos el array de datos y añadimos cada tarea al object store
  datosAGuardar.forEach(tarea => {
    listaTareas.add(tarea);
    // NOTA: No se maneja el evento onsuccess ni onerror para cada operación add
    // lo que podría causar problemas si alguna inserción falla
  });
}

/**
 * Función que elimina un registro específico de la base de datos
 * En este caso, elimina la tarea con id "tarea_3"
 */
function eliminarDatos() {
  // Iniciamos una transacción en modo "readwrite"
  // y eliminamos el registro con la clave "tarea_3"
  var peticion = db.transaction("listaTareas", "readwrite")
    .objectStore("listaTareas")
    .delete("tarea_3");

  // Manejamos el evento de éxito de la operación delete
  peticion.onsuccess = function (event) {
    console.log("El registro se ha eliminado")
  };
  
  // NOTA: No se maneja el evento onerror, lo que podría causar problemas
  // si la eliminación falla por alguna razón
}

/**
 * Función para leer un registro específico por su ID
 * En este caso, lee la tarea con id "tarea_1"
 */
function leerPorID() {
  // Iniciamos una transacción de solo lectura y obtenemos el registro con clave "tarea_1"
  db.transaction("listaTareas").objectStore("listaTareas").get("tarea_1").onsuccess = function (event) {
    // Mostramos el resultado en la consola
    console.log(event.target.result);
  };
  
  // NOTA: No se maneja el evento onerror, lo que podría causar problemas
  // si la lectura falla por alguna razón
}

/**
 * Función para actualizar un registro existente
 * Actualiza la tarea con id "tarea_2" con nuevos valores
 */
function actualizarRegistro() {
  // Definimos el objeto actualizado manteniendo el mismo id
  let registro = { id: "tarea_2", titulo: "Compras Supermercado", descripcion: "Hacer las compras" }

  // Iniciamos una transacción en modo "readwrite" y usamos put para actualizar el registro
  // put reemplaza el registro si existe, o lo crea si no existe
  db.transaction("listaTareas", "readwrite").objectStore("listaTareas").put(registro).onsuccess = e => {
    console.log("Se ha actualizado el registro");
  }
  
  // NOTA: No se maneja el evento onerror, lo que podría causar problemas
  // si la actualización falla por alguna razón
}

/**
 * Función para leer todos los registros de la base de datos
 * Utiliza un cursor para recorrer todos los registros uno por uno
 */
function leerTodasLasTareas() {
  // Obtenemos el object store en una transacción de solo lectura
  var objectStore = db.transaction("listaTareas").objectStore("listaTareas");

  // Abrimos un cursor para recorrer todos los registros
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      // Si el cursor apunta a un registro válido, lo mostramos en consola
      console.log(cursor.value);
      // Avanzamos al siguiente registro
      cursor.continue();
    }
    // Cuando cursor es null, hemos llegado al final de los registros
  };
  
  // NOTA: No se maneja el evento onerror, lo que podría causar problemas
  // si la operación del cursor falla
}

// Iniciamos la aplicación abriendo la conexión a la base de datos
abrirBasesDeDatos();

