const boton = document.querySelector('#btn-cambio');
if (boton) {
    boton.addEventListener('click', () => {
        document.body.style.backgroundColor = '#333';
        console.log("¡JavaScript funcionando correctamente!");
    });
}

const form = document.querySelector('#gym-form');
const errorMsg = document.querySelector('#error-msg');
const successMsg = document.querySelector('#success-msg');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        errorMsg.textContent = '';
        successMsg.textContent = '';

        const nombre = document.querySelector('#nombre').value.trim();
        const email = document.querySelector('#email').value.trim();
        const edadStr = document.querySelector('#edad').value.trim();

        if (!nombre || !email || !edadStr) {
            errorMsg.textContent = 'Error: Todos los campos son obligatorios.';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            errorMsg.textContent = 'Error: El correo electrónico debe incluir un "@" y un punto ".".';
            return;
        }

        const edad = Number(edadStr);
        if (isNaN(edad) || edad < 15 || edad > 99) {
            errorMsg.textContent = 'Error: La edad debe ser un número válido entre 15 y 99.';
            return;
        }

        successMsg.textContent = '¡Inscripción enviada con éxito! Nos pondremos en contacto contigo.';
        form.reset();
    });
}

const contenedorClases = document.getElementById('lista-clases');
const mensajeError = document.getElementById('error-servidor');

function obtenerClases() {
    fetch('/api/clases')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('El servidor no respondió correctamente');
            }
            return respuesta.json();
        })
        .then(clases => {
            
            if (mensajeError) mensajeError.style.display = 'none';
            if (contenedorClases) contenedorClases.innerHTML = ''; 

         
            clases.forEach(clase => {
                const tarjeta = document.createElement('div');
                tarjeta.className = 'clase-card';
                tarjeta.innerHTML = `
                    <h3>${clase.nombre}</h3>
                    <p><strong>Instructor:</strong> ${clase.instructor}</p>
                    <p><strong>Horario:</strong> ${clase.horario}</p>
                    <hr>
                `;
                if (contenedorClases) contenedorClases.appendChild(tarjeta);
            });
        })
        .catch(error => {
           
            console.error('Error de conexión:', error);
            if (contenedorClases) contenedorClases.innerHTML = '';
            if (mensajeError) mensajeError.style.display = 'block';
        });
}


obtenerClases();
