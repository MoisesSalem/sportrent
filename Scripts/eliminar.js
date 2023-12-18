const URL = "https://matiaspq1.pythonanywhere.com/"
const app = Vue.createApp({
    data() {
        return {
            reservas: []
        }
    },
    methods: {
        obtenerReservas() {
            // Obtenemos el contenido
            fetch(URL + 'reservas')
                .then(response => {
                    // Parseamos la respuesta JSON
                    if (response.ok) { return response.json(); }
                })
                .then(data => {
                    // El código Vue itera este elemento para generar la tabla
                    this.reservas = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener las reservas.');
                });
        },
        eliminarReservas(codigo) {
            if (confirm('¿Estás seguro?')) {
                fetch(URL + `reservas/${codigo}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            this.reservas = this.reservas.filter(reserva => reserva.codigo !== codigo);
                            alert('Reserva eliminada correctamente.');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        },
        // Función para formatear la fecha
        formatear(rawDate) {
            const date = new Date(rawDate);
            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('es-ES', options);
}
    },
    mounted() {
        //Al cargar la página, obtenemos la lista de reservas
        this.obtenerReservas();
    }
});
app.mount('body');
