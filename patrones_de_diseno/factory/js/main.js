// Importamos la función fábrica desde el módulo FabricaMunecas.js
// Esta es la única parte que necesitamos importar, ya que encapsula todo el proceso de creación
import { crearMuneca } from "./FabricaMunecas.js"

// Definición de las propiedades para crear la muñeca
// Este objeto contiene todas las características que tendrá nuestra muñeca
let propiedades = {
  // Nombre de la muñeca
  nombre: "Eli",
  
  // Propiedades de la cabeza
  // NOTA: Hay una inconsistencia aquí. En FabricaMunecas.js, la función factory
  // espera que estas propiedades estén en el objeto principal, no anidadas
  cabeza:{
    colorOjos: "azul",
    tamanoOjos: "mediano",
    tamañoBoca: "pequena",
    formaCabeza: "ovalada"
  },
  
  // Propiedades del cabello
  // NOTA: Misma inconsistencia que con la cabeza
  cabello: {
    longitudPelo: "largo",
    color: "cafe",
    estilo: "flequillo",
    accesorio: "lazo"
  },
  
  // Propiedades del cuerpo
  // NOTA: Aquí también hay una inconsistencia, ya que en FabricaMunecas.js
  // se espera que altura y colorPiel estén en el objeto principal
  cuerpo:{
    altura: 5,
    colorPiel: "oliva"
  },
  
  // Propiedades de la ropa
  // NOTA: Misma inconsistencia que con los demás componentes
  ropa:{
    tipo: "vestido",
    color: "morada",
    zapatos: "tenis" // Nota cultural: "tenis" en algunos países se refiere a zapatillas deportivas
  }
}

// Creación de la muñeca usando la fábrica
// Este es el punto clave del patrón Factory: toda la complejidad de creación
// está encapsulada en la función crearMuneca()
let muneca = crearMuneca(propiedades);

// Uso de la muñeca creada
// Llamamos al método decirNombre() que está definido en la clase Cuerpo
muneca.decirNombre(); // Debería mostrar: "Mi nombre es Eli"
