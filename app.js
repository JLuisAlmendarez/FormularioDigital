let map, marker;
const initialLocation = {lat: 20.659698, lng: -103.349609}; // Coordenadas iniciales, ajustables

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialLocation,
        zoom: 12
    });
    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        draggable: true
    });

    // Actualizar las coordenadas al hacer clic en el mapa
    map.addListener('click', function(event) {
        marker.setPosition(event.latLng);
        updateCoordinates(event.latLng);
    });

    // Actualizar las coordenadas cuando el marcador se deja de arrastrar
    google.maps.event.addListener(marker, 'dragend', function() {
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

    fetch('https://script.google.com/macros/s/AKfycbxR8SGp4xWieeFYmvqljJG-5tTDDsFyy-0kY4KqqGCr8gzmi9zIZNaHKVOkW-yNqu0/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lat: lat, lng: lng})
    })
        .then(response => {
            console.log('Ubicación guardada correctamente.');
            alert('Ubicación guardada correctamente.');
            resetMap(); // Llamar a la función que resetea el mapa y el marcador
        })
        .catch(error => {
            console.error('Error al guardar la ubicación:', error);
            alert('Error al guardar la ubicación.');
        });

    return false; // Evitar que el formulario se envíe de forma tradicional
}

function resetMap() {
    // Restablece el centro del mapa y la posición del marcador a las coordenadas iniciales
    map.setCenter(initialLocation);
    marker.setPosition(initialLocation);
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();
});
