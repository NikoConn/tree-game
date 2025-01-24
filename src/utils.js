function calculateDistance(lat1, lon1, lat2, lon2) {
  var earthRadius = 6371e3; // Earth radius in meters
  var φ1 = (lat1 * Math.PI) / 180; // Convert latitude 1 from degrees to radians
  var φ2 = (lat2 * Math.PI) / 180; // Convert latitude 2 from degrees to radians
  var Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitude in radians
  var Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitude in radians

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = earthRadius * c; // Distance in meters
  return distance;
}

function get_location(callback) {
  if ("geolocation" in navigator) {
    // Solicitar la ubicación del usuario
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Obtener las coordenadas de la ubicación
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        if (callback) {
          callback([latitude, longitude]);
        }
      },
      function (error) {
        // Manejar el caso en que el usuario no permite la ubicación
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("El usuario denegó la solicitud de geolocalización.");
            geolocation_needed_element.style.display = "flex";
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Información de ubicación no disponible.");
            break;
          case error.TIMEOUT:
            console.error(
              "Tiempo de espera agotado para obtener la ubicación."
            );
            break;
          case error.UNKNOWN_ERROR:
            console.error(
              "Se produjo un error desconocido al obtener la ubicación."
            );
            break;
        }
      }
    );
  } else {
    // Manejar el caso en que el navegador no soporta la geolocalización
    console.error("Geolocalización no soportada en este navegador.");
  }
}

function getRandomKey(obj) {
    // Obtener todas las claves del objeto
    var keys = Object.keys(obj);
    
    // Generar un número aleatorio entre 0 y la longitud del arreglo de claves
    var randomIndex = Math.floor(Math.random() * keys.length);
    
    // Utilizar el número aleatorio como índice para obtener una clave aleatoria del objeto
    var randomKey = keys[randomIndex];
    
    return randomKey;
  }