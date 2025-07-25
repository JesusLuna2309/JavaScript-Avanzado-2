/* Service worker  */

// Evento 'activate': Se dispara cuando el Service Worker se activa
// Esto ocurre después de la instalación y cuando no hay versiones anteriores controlando clientes
self.addEventListener('activate', function (event) {
  console.log("El service worker esta activo");
  
  // MEJORA POTENCIAL: Limpiar cachés antiguos durante la activación
  // event.waitUntil(
  //   caches.keys().then(cacheNames => {
  //     return Promise.all(
  //       cacheNames.filter(cacheName => cacheName !== 'v1')
  //         .map(cacheName => caches.delete(cacheName))
  //     );
  //   })
  // );
});

// Evento 'fetch': Intercepta todas las peticiones HTTP que realiza la aplicación
// Permite implementar estrategias de caché personalizadas para cada recurso
self.addEventListener('fetch', (event) => {
  console.log("Petición de red: ", event);
  
  // event.respondWith(): Define cómo responder a la petición interceptada
  // Sin esta línea, las peticiones continuarían normalmente hacia la red
  event.respondWith(
    // Primero intentamos encontrar la petición en el caché
    caches.match(event.request).then((resp) => {
      // Si encontramos respuesta en caché, la devolvemos inmediatamente (Cache Hit)
      // Si no la encontramos (Cache Miss), ejecutamos la expresión después del OR (||)
      return resp || fetch(event.request).then((response) => {
        // La petición a la red fue exitosa, ahora abrimos/creamos el caché 'v1'
        return caches.open('v1').then((cache) => {
          // Guardamos una copia de la respuesta en el caché
          // Necesitamos clonar la respuesta porque los streams solo pueden leerse una vez
          // Una copia va al caché y la original se devuelve al navegador
          cache.put(event.request, response.clone());
          // Devolvemos la respuesta original al navegador
          return response;
        });  
      });
      // MEJORA POTENCIAL: Manejar errores de red para servir una página de fallback
      // .catch(error => {
      //   console.error('Error en fetch:', error);
      //   return caches.match('./offline.html');
      // });
    })
  );
});

// Evento 'install': Se dispara cuando el Service Worker se instala por primera vez
// Es el momento ideal para precachear recursos esenciales para la experiencia offline
self.addEventListener('install', (event) => {
  // event.waitUntil(): Extiende el evento de instalación hasta que la promesa se resuelve
  // Esto evita que el Service Worker se active hasta que el precacheo se complete
  event.waitUntil(
    // Abrimos/creamos el caché llamado 'v1'
    caches.open('v1').then((cache) => {
      // Precacheamos una lista de recursos críticos para la aplicación
      // Estos recursos estarán disponibles incluso sin conexión
      return cache.addAll([
        './',                    // La página principal (index.html)
        './assets/main.js',      // El script principal de la aplicación
        'assets/images/img1.jpeg', // Las cinco imágenes que utiliza la aplicación
        'assets/images/img2.jpeg',
        'assets/images/img3.jpeg',
        'assets/images/img4.jpeg',
        'assets/images/img5.jpeg'
      ]);
      // MEJORA POTENCIAL: Añadir una página de fallback para cuando no hay conexión
      // cache.add('./offline.html');
    })
    // MEJORA POTENCIAL: Manejar errores durante la instalación
    // .catch(error => console.error('Error durante la instalación:', error))
  );
  
  // MEJORA POTENCIAL: Forzar la activación inmediata sin esperar a que se cierren las pestañas
  // self.skipWaiting();
});