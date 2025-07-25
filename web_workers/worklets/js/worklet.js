// Definición de la clase que implementa el Paint Worklet
// Los Paint Worklets son parte de CSS Houdini, que permite extender las capacidades de renderizado de CSS
// con JavaScript, dando a los desarrolladores acceso directo al pipeline de renderizado del navegador
class DibujadorCirculos {
    // El método paint es obligatorio y será llamado por el navegador cuando necesite renderizar este worklet
    // Recibe dos parámetros principales:
    // - context: Similar al contexto 2D de Canvas, proporciona métodos para dibujar
    // - geom: Contiene información sobre las dimensiones del área donde se aplicará el worklet
    paint(context, geom) {
        // Configuración de parámetros para la generación de círculos
        // Limita el número total de círculos que se dibujarán a 100
        var maxNumCirculos = 100;
        // Define el radio máximo de los círculos en píxeles
        var maxRadio = 30;
        // Define el radio mínimo de los círculos en píxeles
        var minRadio = 3;
        
        // Paleta de colores predefinida con cuatro tonos de amarillo/dorado a blanco
        // Estos colores forman una paleta armónica que va de más intenso a más claro
        var colors = ["#D39516", "#FFB51D", "#FFDD98", "#FFFFFF"];
        
        // Almacena la longitud del array de colores para usarla en el cálculo del índice aleatorio
        var numColores = colors.length;
        
        // Bucle principal que genera cada uno de los círculos
        // Se ejecuta maxNumCirculos veces (100 en este caso)
        for (var n = 0; n < maxNumCirculos; n++) {
            // Genera una posición X aleatoria dentro del ancho disponible
            // Math.random() devuelve un valor entre 0 (inclusive) y 1 (exclusive)
            var xPos = Math.random() * geom.width;
            
            // Genera una posición Y aleatoria dentro de la altura disponible
            var yPos = Math.random() * geom.height;
            
            // Calcula un radio aleatorio entre minRadio y maxRadio
            // La fórmula asegura que el radio nunca sea menor que minRadio
            var radius = minRadio + (Math.random() * (maxRadio - minRadio));
            
            // Selecciona un índice aleatorio para elegir un color de la paleta
            // Multiplicamos por (numColores - 1) para obtener un valor entre 0 y numColores-1
            var colorIndex = Math.random() * (numColores - 1);
            // Redondeamos para obtener un índice entero válido para el array
            colorIndex = Math.round(colorIndex);
            
            // Obtiene el color correspondiente al índice calculado
            var color = colors[colorIndex];
            
            // Llama al método auxiliar para dibujar un círculo con los parámetros generados
            this.dibujarCirculo(context, xPos, yPos, radius, color);
        }
    }

    // Método auxiliar que encapsula la lógica de dibujar un círculo individual
    // Esto mejora la legibilidad del código y facilita su mantenimiento
    dibujarCirculo(context, xPos, yPos, radius, color) {
        // Conversión de grados a radianes para definir el arco
        // Un círculo completo va de 0 a 360 grados, que equivale a 0-2π radianes
        var startAngle = (Math.PI / 180) * 0;   // Ángulo inicial: 0 grados en radianes
        var endAngle = (Math.PI / 180) * 360;   // Ángulo final: 360 grados en radianes
        
        // Configuración de la sombra para dar efecto de profundidad a los círculos
        context.shadowColor = "gray";           // Color de la sombra: gris
        context.shadowOffsetX = 1;              // Desplazamiento horizontal: 1px
        context.shadowOffsetY = 1;              // Desplazamiento vertical: 1px
        context.shadowBlur = 5;                 // Desenfoque de la sombra: 5px
        
        // Inicia un nuevo trazado en el contexto
        // Esto es necesario para dibujar una forma nueva
        context.beginPath();
        
        // Crea un arco que forma un círculo completo
        // Los parámetros son: (x, y, radio, ánguloInicial, ánguloFinal, sentidoAntihorario)
        context.arc(xPos, yPos, radius, startAngle, endAngle, false);
        
        // Establece el color de relleno para el círculo
        context.fillStyle = color;
        
        // Rellena el círculo con el color definido
        context.fill();
        
        // NOTA: No es necesario llamar a closePath() aquí porque fill() implícitamente cierra el trazado
    }
}

// Registra la clase como un Paint Worklet con el nombre 'circulos'
// Este nombre es el que se usará en CSS con la función paint()
// Ejemplo de uso en CSS: background-image: paint(circulos);
registerPaint('circulos', DibujadorCirculos);

// CONSIDERACIONES ADICIONALES:
// 1. Los Paint Worklets se ejecutan en un hilo separado, por lo que no bloquean el hilo principal
// 2. No tienen acceso al DOM ni a las APIs de JavaScript que requieren el contexto de ventana
// 3. Son más eficientes que manipular el DOM para efectos visuales similares
// 4. Para usar este worklet, primero debe registrarse con CSS.paintWorklet.addModule('ruta/a/worklet.js')