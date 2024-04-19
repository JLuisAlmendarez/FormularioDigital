document.getElementById('surveyForm').addEventListener('submit', generateFormHTML);

function addQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-div';
    questionDiv.innerHTML = `
        <input type="text" placeholder="Pregunta" required>
        <select onchange="configureQuestionType(this)">
            <option value="">Seleccione tipo</option>
            <option value="text">Texto</option>
            <option value="multipleChoice">Opción Múltiple</option>
            <option value="checkbox">Casillas de Verificación</option>
            <option value="number">Número</option>
            <option value="location">Ubicación</option>
        </select>
        <div class="optionsContainer"></div>
        <button onclick="this.parentNode.remove()">Eliminar Pregunta</button>
    `;
    questionsContainer.appendChild(questionDiv);
}

function configureQuestionType(select) {
    const optionsContainer = select.nextElementSibling;
    optionsContainer.innerHTML = ''; // Limpiar opciones previas
    switch (select.value) {
        case 'multipleChoice':
            addOptionField(optionsContainer, 'radio');
            break;
        case 'checkbox':
            addOptionField(optionsContainer, 'checkbox');
            break;
        case 'number':
            optionsContainer.innerHTML = '<input type="number" placeholder="Número">';
            break;
        case 'location':
            initMap(optionsContainer);
            break;
        case 'text':
        default:
            break;
    }
}

function addOptionField(container, type) {
    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.min = 1;
    numberInput.placeholder = 'Número de opciones';
    numberInput.onchange = function () {
        const numOptions = parseInt(numberInput.value, 10);
        container.innerHTML = '';
        for (let i = 0; i < numOptions; i++) {
            const optionLabel = document.createElement('input');
            optionLabel.type = 'text';
            optionLabel.placeholder = 'Texto de la opción ' + (i + 1);
            container.appendChild(optionLabel);

            const optionInput = document.createElement('input');
            optionInput.type = type;
            optionInput.name = type === 'radio' ? 'radio-group' : `checkbox-group-${i}`;
            container.appendChild(optionInput);
            container.appendChild(document.createElement('br'));
        }
    };

    container.appendChild(numberInput);
}


function initMap(container) {
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '400px';
    container.appendChild(mapDiv);

    loadGoogleMapsApi();
}

function loadGoogleMapsApi() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCxZaS4SlAUcoxS--DtNxjvPeLbsh9ePNY&callback=initMapCallback`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

window.initMapCallback = function() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        const map = new google.maps.Map(mapDiv, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });

        const marker = new google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 },
            map: map,
            draggable: true
        });

        google.maps.event.addListener(marker, 'position_changed', function () {
            const latLng = marker.getPosition();
            console.log('Nueva ubicación: ' + latLng.lat() + ', ' + latLng.lng());
        });
    } else {
        console.error('Map div not found');
    }
};


