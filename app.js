let map, marker;

function initMap() {
    const initialLocation = {lat: 20.659698, lng: -103.349609}; // Puedes cambiar estas coordenadas iniciales por cualquier otra
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialLocation,
        zoom: 12
    });
    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        draggable: true
    });

    // Actualiza las coordenadas al hacer clic en el mapa
    map.addListener ('click', function (event) {
        marker.setPosition(event.latLng);
        updateCoordinates(event.latLng);
    });

    // Actualiza las coordenadas cuando el marcador se deja de arrastrar
    google.maps.event.addListener (marker, 'dragend', function() {
        updateCoordinates(marker.getPosition());
    });
}

function updateCoordinates(location) {
    document.getElementById('lat').value = location.lat();
    document.getElementById('lng').value = location.lng();
}

function geocodeAddress() {
    const address = document.getElementById('address').value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            updateCoordinates(results[0].geometry.location);
        } else {
            alert('La geocodificación no fue exitosa por la siguiente razón: ' + status);
        }
    });
}

function submitForm() {
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    console.log(`Latitud: ${lat}, Longitud: ${lng}`);
    // Aquí podrías agregar el código para enviar los datos al servidor, o integrar el código para usar una API como Microsoft Graph
    return false; // Evitar que el formulario se envíe de forma tradicional
}

document.addEventListener('DOMContentLoaded', function() {
    // Asegura que el mapa se inicializa solo cuando el DOM está completamente cargado
    initMap();
});

