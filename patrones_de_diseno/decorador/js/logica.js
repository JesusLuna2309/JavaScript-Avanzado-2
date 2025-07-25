// PARTE 1: Ejemplo básico de modificación de objetos en JavaScript
// Esta sección demuestra la flexibilidad de JavaScript para modificar objetos en tiempo de ejecución

// Definición de una clase básica de Usuario
class Usuario{
  constructor(nombre){
    this.nombre = nombre;
  }
  saludar(){
    console.log(`Hola mi nombre es ${this.nombre}`);
  }
}

// Creación de una instancia estándar que utiliza el comportamiento definido en la clase
let usuario1 = new Usuario("John Doe");
usuario1.saludar(); // Salida: "Hola mi nombre es John Doe"

// Creación de una segunda instancia que será modificada dinámicamente
let usuario2 = new Usuario("Jane Doe");
// Añadimos una nueva propiedad (esto no afecta a la definición de la clase Usuario)
usuario2.direccion = "#14 de la Calle 13, avenida 4";
// Sobreescribimos el método saludar para incluir la nueva propiedad
// Esto es una forma simple de decoración, pero no sigue estrictamente el patrón decorador
usuario2.saludar = function(){
  console.log(`Hola mi nombre es ${this.nombre}, yo vivo en ${this.direccion}`);
}
usuario2.saludar(); // Salida: "Hola mi nombre es Jane Doe, yo vivo en #14 de la Calle 13, avenida 4"

///////

// PARTE 2: Implementación del patrón Decorador
// El patrón Decorador permite añadir funcionalidades a objetos dinámicamente sin alterar su estructura básica

// Definición de la clase base que será decorada
class Ensalada{
  // Inicializamos la lista de ingredientes como un array vacío
  listaIngredientes = [];

  // Método base que será extendido por los decoradores
  // Inicialmente la ensalada no tiene costo
  costoTotal(){
    return 0;
  }

  constructor(){}
}

// Objeto contenedor para los diferentes decoradores
// Cada decorador es una función que modifica el objeto Ensalada
const Ingredientes = {};

// Decorador para añadir tomate a la ensalada
Ingredientes.tomate = (ensalada)=>{
  // Añadimos el ingrediente a la lista
  ensalada.listaIngredientes.push("tomate");
  // Guardamos el costo actual de la ensalada
  let costo = ensalada.costoTotal();
  // Reemplazamos el método costoTotal para incluir el costo del tomate
  // Este es el núcleo del patrón decorador: extender funcionalidad preservando la interfaz
  ensalada.costoTotal = ()=> costo + 0.5;
}

// Decorador para añadir lechuga
Ingredientes.lechuga = (ensalada)=>{
  ensalada.listaIngredientes.push("lechuga");
  let costo = ensalada.costoTotal();
  ensalada.costoTotal = ()=> costo + 0.2;
}

// Decorador para añadir aguacate
Ingredientes.aguacate = (ensalada)=>{
  ensalada.listaIngredientes.push("aguacate");
  let costo = ensalada.costoTotal();
  ensalada.costoTotal = ()=> costo + 1;
}

// Decorador para añadir pimiento
Ingredientes.pimiento = (ensalada)=>{
  ensalada.listaIngredientes.push("pimiento");
  let costo = ensalada.costoTotal();
  ensalada.costoTotal = ()=> costo + 0.15;
}

// Decorador para añadir maíz dulce
Ingredientes.maizDulce = (ensalada)=>{
  ensalada.listaIngredientes.push("maizDulce");
  let costo = ensalada.costoTotal();
  ensalada.costoTotal = ()=> costo + 0.2;
}

// Decorador para añadir huevo
Ingredientes.huevo = (ensalada)=>{
  ensalada.listaIngredientes.push("huevo");
  let costo = ensalada.costoTotal();
  ensalada.costoTotal = ()=> costo + 0.5;
}

// Uso del patrón decorador:
// 1. Creamos la instancia base
let ensalada = new Ensalada();
// 2. Aplicamos varios decoradores en secuencia
Ingredientes.lechuga(ensalada);
Ingredientes.tomate(ensalada);
Ingredientes.aguacate(ensalada);
Ingredientes.aguacate(ensalada); // Podemos añadir el mismo ingrediente varias veces
Ingredientes.pimiento(ensalada);

// Mostramos el resultado final
console.log("Ingredientes: "+ensalada.listaIngredientes.join());
// Salida: "Ingredientes: lechuga,tomate,aguacate,aguacate,pimiento"

console.log("Costo total: "+ensalada.costoTotal());
// Salida: "Costo total: 2.85" (0.2 + 0.5 + 1 + 1 + 0.15)

