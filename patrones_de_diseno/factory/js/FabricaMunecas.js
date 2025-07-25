// Clase base que representa el cuerpo de la muñeca
// Esta es la clase principal que contiene referencias a las demás partes
class Cuerpo{
    // Declaración explícita de las propiedades de la clase
    // En JavaScript moderno no es estrictamente necesario, pero mejora la legibilidad
    altura;
    colorPiel;
    cabeza;
    cabello;
    ropa;
    nombre;

    // El constructor recibe un objeto de propiedades que permite inicializar
    // los atributos básicos del cuerpo
    constructor(propiedades){
        this.altura = propiedades.altura;
        this.colorPiel = propiedades.colorPiel;
        this.nombre = propiedades.nombre;
    }

    // Método para asignar una cabeza al cuerpo
    asignarCabeza(cabeza){
        this.cabeza = cabeza;
    }

    // Método para asignar cabello, con validación para asegurar que
    // primero se ha asignado una cabeza
    asignarCabello(cabello){
        if(!this.cabeza){
            throw new Error("Sin cabeza no hay cabello");
        }
        this.cabello = cabello;
    }

    // Método para asignar ropa
    asignarRopa(ropa){
        this.ropa = ropa;
    }

    // Método que simula la funcionalidad de la muñeca
    decirNombre(){
        console.log(`Mi nombre es ${this.nombre}`)
    }
}

// Clase que representa la cabeza de la muñeca
class Cabeza{
    // Propiedades de la cabeza
    colorOjos;
    tamanoOjos;
    tamañoBoca;
    formaCabeza;
    
    // Constructor que inicializa las propiedades de la cabeza
    constructor(propiedades){
        this.colorOjos = propiedades.colorOjos;
        this.tamanoOjos = propiedades.tamanoOjos;
        this.tamañoBoca = propiedades.tamañoBoca;
        this.formaCabeza = propiedades.formaCabeza;
    }
}

// Clase que representa el cabello de la muñeca
class Cabello{
    // Propiedades del cabello
    longitudPelo;
    color;
    estilo;
    accesorio;

    // Constructor que inicializa las propiedades del cabello
    constructor(propiedades){
        this.longitudPelo = propiedades.longitudPelo;
        this.color = propiedades.color;
        this.estilo = propiedades.estilo;
        this.accesorio = propiedades.accesorio;
    }
}

// Clase que representa la ropa de la muñeca
class Ropa{
    // Propiedades de la ropa
    tipo;
    color;
    zapatos;

    // Constructor que inicializa las propiedades de la ropa
    constructor(propiedades){
        this.tipo = propiedades.tipo;
        this.color = propiedades.color;
        this.zapatos = propiedades.zapatos;
    }
}

// AQUÍ ESTÁ LA IMPLEMENTACIÓN DEL PATRÓN FACTORY
// Esta función es la "fábrica" que se encarga de crear muñecas completas
// Oculta la complejidad de crear cada parte y ensamblarlas correctamente
export function crearMuneca(propiedades){
    // 1. Creamos el cuerpo de la muñeca
    let muneca = new Cuerpo(propiedades);
    
    // 2. Creamos y asignamos la cabeza
    muneca.asignarCabeza(new Cabeza(propiedades));
    
    // 3. Creamos y asignamos el cabello
    muneca.asignarCabello(new Cabello(propiedades));
    
    // 4. Creamos y asignamos la ropa
    muneca.asignarRopa(new Ropa(propiedades));
    
    // 5. Devolvemos la muñeca completamente ensamblada
    return muneca;
}