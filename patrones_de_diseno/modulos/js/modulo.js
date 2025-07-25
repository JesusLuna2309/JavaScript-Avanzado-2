// Variable de ámbito de módulo - actúa como un estado interno "privado"
// Esta variable no es accesible directamente desde fuera del módulo
// porque no se exporta, proporcionando encapsulación real
var unaPropiedadPrivada = 5;

// Función "setter" que permite modificar el estado interno desde el exterior
// Solo el código que importa esta función puede modificar unaPropiedadPrivada
function actualizarPropiedad(valor){
    unaPropiedadPrivada = valor
}

// Función "getter" que permite leer el estado interno desde el exterior
// Proporciona acceso de solo lectura al valor actual de la propiedad privada
function obtenerPropiedad(){
    return unaPropiedadPrivada;
}

// Exportación selectiva - define la API pública del módulo
// Solo estas dos funciones serán accesibles para el código que importe este módulo
// La variable unaPropiedadPrivada permanece inaccesible desde el exterior
export {obtenerPropiedad, actualizarPropiedad};

// NOTA: Este módulo implementa un patrón de diseño común:
// - Estado interno encapsulado (unaPropiedadPrivada)
// - API pública controlada (las dos funciones exportadas)
// - Separación entre interfaz pública e implementación privada
