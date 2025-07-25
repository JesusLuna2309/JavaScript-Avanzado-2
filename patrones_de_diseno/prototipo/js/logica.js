// Definición del objeto prototipo con un método compartido
// Este objeto servirá como plantilla o "molde" para otros objetos
var personaPrototipo = {
  decirNombre: function () {
    console.log('Mi nombre es' + this.nombre);
  }
};

// Creación de un nuevo objeto utilizando Object.create()
// El primer parámetro es el prototipo del nuevo objeto
// El segundo parámetro define las propiedades específicas del objeto creado
var persona = Object.create(personaPrototipo, {
  'nombre': {
    value: "Natalia",      // Valor de la propiedad
    enumerable: false      // La propiedad no aparecerá en iteraciones (for...in, Object.keys(), etc.)
                           // Por defecto es false si no se especifica
  },
  'apellido': {
    value: 'Corea',        // Valor de la propiedad
    writable: false,       // La propiedad no puede ser modificada con asignación directa
                           // Por defecto es false si no se especifica
    configurable: false    // La propiedad no puede ser eliminada ni sus atributos modificados
                           // Por defecto es false si no se especifica
  }
});

// Este intento de modificar la propiedad 'apellido' no tendrá efecto
// debido a que se configuró como no modificable (writable: false)
// En modo estricto ('use strict'), esto generaría un error TypeError
persona.apellido = "random";

// Este intento de eliminar la propiedad 'apellido' no tendrá efecto
// debido a que se configuró como no configurable (configurable: false)
// En modo estricto ('use strict'), esto generaría un error TypeError
delete persona.apellido;

// Iteración sobre las propiedades enumerables del objeto
// Solo mostrará las propiedades enumerables, tanto propias como heredadas
for(var key in persona){
  console.log(key); // Solo mostrará 'decirNombre', ya que:
                    // - 'nombre' no es enumerable (enumerable: false)
                    // - 'apellido' es enumerable por defecto, pero el bucle for...in solo
                    //   muestra primero las propiedades del prototipo
}