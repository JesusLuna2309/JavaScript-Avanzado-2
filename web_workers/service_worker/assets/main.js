// Registra un Service Worker ubicado en 'worker.js' en el ámbito actual (scope predeterminado)
// Los Service Workers permiten implementar funcionalidades como almacenamiento en caché, 
// experiencias offline y notificaciones push
navigator.serviceWorker.register('worker.js').then(() => {
    // Este callback se ejecuta cuando el registro del Service Worker se completa exitosamente
    // En una implementación más robusta, se debería incluir un catch para manejar errores
    console.log("servide worker registrado");
})

// Añade un event listener al botón para procesar clics del usuario
// El elemento con id "btn" debe existir en el HTML antes de que este código se ejecute
document.getElementById("btn").addEventListener("click", ()=>{

    // Array con rutas relativas a 5 imágenes diferentes
    // Estas rutas son relativas a la ubicación del archivo HTML principal
    let urls = [
        "assets/images/img1.jpeg",
        "assets/images/img2.jpeg",
        "assets/images/img3.jpeg",
        "assets/images/img4.jpeg",
        "assets/images/img5.jpeg"
    ];
    
    // Genera un número aleatorio entre 0 y 4 (ambos inclusive)
    // Math.random() genera un número decimal entre 0 (inclusive) y 1 (exclusive)
    // Al multiplicarlo por 4 obtenemos un número entre 0 y 4 (exclusive)
    // Math.round() redondea al entero más cercano, dando valores entre 0 y 4
    // NOTA: Una alternativa más precisa sería Math.floor(Math.random() * 5)
    let aleatorio = Math.round(Math.random()*4);

    // Utiliza la API Fetch para realizar una petición HTTP a la URL seleccionada
    // Esta petición será interceptada por el Service Worker si está configurado para ello
    // Fetch devuelve una Promise que se resuelve con el objeto Response
    fetch(urls[aleatorio]).then(response => {
        // Convierte la respuesta a un objeto Blob (Binary Large Object)
        // Un Blob representa datos binarios inmutables, ideal para imágenes
        // Este método también devuelve una Promise
        return response.blob();
    }).then(blob => {
        // Crea una URL temporal para el objeto Blob
        // Esta URL es válida solo en el contexto del navegador actual
        // y persistirá hasta que la página se cierre o se llame a URL.revokeObjectURL()
        let url = URL.createObjectURL(blob);
        
        // Crea dinámicamente un elemento <img> para mostrar la imagen
        let imgTag = document.createElement("img");
        
        // Establece la URL del Blob como fuente de la imagen
        imgTag.src = url;
        
        // Añade la imagen al final del body del documento
        // En una aplicación real, probablemente querríamos añadirla a un contenedor específico
        // o reemplazar una imagen existente en lugar de acumular imágenes
        document.body.appendChild(imgTag);
        
        // CONSIDERACIÓN: Para evitar fugas de memoria, sería recomendable
        // liberar la URL del objeto cuando ya no sea necesaria:
        // imgTag.onload = () => URL.revokeObjectURL(url);
    })
    // CONSIDERACIÓN: Falta manejo de errores con .catch() para casos como:
    // - Errores de red
    // - Imágenes no encontradas (404)
    // - Problemas al procesar la imagen
}).catch(error => {
    console.error("Error al cargar la imagen:", error);
});