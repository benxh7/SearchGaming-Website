const mensajeDinamico = document.querySelector('.mensaje-dinamico');

// Mensajes dinámicos que mostraremos en el inicio de la pagina
const mensajes = [
    'Encuentra los mejores juegos y comunidad con nosotros.',
    'Pensada por gamers para gamers.',
    'Encuentra el juego que más te guste entre nuestras diferentes categorías.',
];

// Tiempo entre cada letra (en milisegundos) para escribir y borrar
const tiempoEntreLetras = 100; // 0.1 segundos por letra al escribir
const tiempoEntreBorrado = 30; // Tiempo especial para el borrado del mensaje
const tiempoEntreMensajes = 5000; // 5 segundos de pausa al terminar de escribir

/* 
Creamos un cursor que parpadea para simular
el efecto de escritura de un mensaje 
*/
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.style.animation = 'parpadeo 0.8s infinite step-start';
mensajeDinamico.appendChild(cursor);


// Función para escribir el mensaje letra por letra
function escribirMensaje(mensaje, indiceMensaje) {
    let i = 0;
    mensajeDinamico.appendChild(cursor); // Agregamos el cursor

    function escribir() {
        if (i < mensaje.length) {
            mensajeDinamico.textContent = mensaje.substring(0, i + 1);
            mensajeDinamico.appendChild(cursor);
            i++;
            setTimeout(escribir, tiempoEntreLetras);
        } else {
            // Cuando se completa el mensaje espera y comienza a borrar letra por letra
            setTimeout(() => {
                borrarMensaje(mensaje, indiceMensaje);
            }, tiempoEntreMensajes);
        }
    }
    escribir();
}

// Función para borrar el mensaje letra por letra con un tiempo especial
function borrarMensaje(mensaje, indiceMensaje) {
    let i = mensaje.length;
    function borrar() {
        if (i > 0) {
            mensajeDinamico.textContent = mensaje.substring(0, i - 1);
            mensajeDinamico.appendChild(cursor);
            i--;
            setTimeout(borrar, tiempoEntreBorrado);
        } else {
            // Cuando se borra todo se escribe el siguiente mensaje
            indiceMensaje = (indiceMensaje + 1) % mensajes.length;
            escribirMensaje(mensajes[indiceMensaje], indiceMensaje);
        }
    }
    borrar();
}

// Inicia la animacion escribiendo el primer mensaje
escribirMensaje(mensajes[0], 0);

const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');

// Al hacer click en "Iniciar Sesión", se mostrara la casilla de registro
loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'block';
});

// Al hacer click en el botón de cerrar, ocultamos la casilla de registro
closeLogin.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

// Cerrar la casilla si se hace click fuera del recuadro
window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});