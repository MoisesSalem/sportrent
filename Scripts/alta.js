const URL = "https://matiaspq1.pythonanywhere.com/"

// let lista=document.getElementById('nombreCancha');
// let tipo = document.getElementById('tipo');
// lista.addEventListener('change', function () {
//     // Actualiza el valor del campo del tipo basándose en la opción seleccionada
//     tipo.value = nombreTipo(this.value);
// });

// function nombreTipo(tipo){
//     switch (tipo) {
//         case 'La San Juan':
//         case 'La Cañada':
//             return 'Futbol 5';
//         case 'Club Las Lomitas':
//             return 'Tenis';
//         default:
//             return '';
//     }
// }
document.addEventListener('DOMContentLoaded', function () {
    // Recupera los datos de sessionStorage
    var nombreCancha = sessionStorage.getItem('nombreCancha');
    var tipo = sessionStorage.getItem('tipo');

    // Muestra los datos en los campos de texto
    document.getElementById('nombreCancha').value = nombreCancha;
    document.getElementById('tipo').value = tipo;
});

// Capturamos el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se envie el form 


    var formData = new FormData();
    formData.append('nombrePersona', document.getElementById('nombrePersona').value);
    formData.append('dni', document.getElementById('dni').value);
    formData.append('nombreCancha', document.getElementById('nombreCancha').value);
    formData.append('tipo', document.getElementById('tipo').value);
    formData.append('fecha', document.getElementById('fecha').value);
    formData.append('hora', document.getElementById('hora').value);

    
    // Realizamos la solicitud POST al servidor
    fetch(URL + 'reservas', {
        method: 'POST',
        body: formData // Aquí enviamos formData en lugar de JSON
    })


    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) { 
            return response.json(); 
        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al reservar.');
        }
    })
    
    // Respuesta OK
    .then(function () {
        // En caso de éxito
        alert('Reservado correctamente.');
        window.location.href = 'bookings.html';
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al reservar.');
        console.error('Error:', error);
    })
    .finally(function () {
        // Limpiar el formulario en ambos casos (éxito o error)
        document.getElementById('nombrePersona').value = "";
        document.getElementById('dni').value = "";
        document.getElementById('nombreCancha').value = "";
        document.getElementById('tipo').value = "";
        document.getElementById('fecha').value = "";
        document.getElementById('hora').value = "";
    });
})
