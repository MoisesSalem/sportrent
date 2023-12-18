const URL = "https://matiaspq1.pythonanywhere.com/"



function nombreTipo(tipo){
    switch (tipo) {
        case 'La San Juan':
            return 'Futbol 5';
        case 'La Cañada':
            return 'Futbol 5';
        case 'Club Las Lomitas':
            return 'Tenis';
        default:
            return '';
    }
}

const app = Vue.createApp({ 
    data() {
        return {
            codigo: '',
            persona: '',
            dni: '',
            cancha: '',
            tipoCancha: '',
            fecha: '',
            hora: '',
            mostrarDatosReserva: false,
        };
    },


    methods: {
        obtenerReserva() {
            fetch(URL + 'reservas/' + this.codigo)
                .then(response =>  {
                    if (response.ok) {
                        return response.json()
                    } else {
                        
                        //Si la respuesta es un error, lanzamos una excepción para ser "catcheada" más adelante en el catch.
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })


                .then(data => {
                    console.log(data)
                    this.persona = data.nombre_persona;
                    this.dni = data.dni;
                    this.cancha = data.nombre_cancha;
                    this.tipoCancha = nombreTipo(data.nombre_cancha);
                    this.fecha = data.fecha;
                    this.hora = data.hora;
                    this.mostrarDatosReserva= true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },
        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombrePersona', this.persona);
            formData.append('dni', this.dni);
            formData.append('cancha', this.cancha);
            formData.append('tipoCancha', this.tipoCancha);
            formData.append('fecha', this.fecha);
            formData.append('hora', this.hora);
            //Utilizamos fetch para realizar una solicitud PUT a la API y guardar los cambios.
            fetch(URL + 'reservas/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
            .then(response => {
                //Si la respuesta es exitosa, utilizamos response.json() para parsear la respuesta en formato JSON.
                if (response.ok) {
                    return response.json()
                } else {
                    //Si la respuesta es un error, lanzamos una excepción.
                    throw new Error('Error al guardar los cambios de la reserva.')
                }
            })
            .then(data => {
                alert('Reserva actualizada.');
                this.limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar la reserva.');
            });
        },
        limpiarFormulario() {
            this.codigo = '',
            this.persona = '',
            this.cancha = '',
            this.tipoCancha = '',
            this.hora = '',
            this.mostrarDatosReserva = false;
        },
        actualizarTipoCancha() {
            switch (this.cancha) {
                case 'La San Juan':
                case 'La Cañada':
                    this.tipoCancha = 'Futbol 5';
                    break;
                case 'Club Las Lomitas':
                    this.tipoCancha = 'Tenis';
                    break;
                default:
                    this.tipoCancha = '';
            }
        },

    }
});


app.mount('#app');
