var mensajeDinamico = document.querySelector('.mensaje-dinamico');

// Mensajes dinámicos que mostraremos en el inicio de la pagina
var mensajes = [
    'Encuentra los mejores juegos y comunidad con nosotros.',
    'Pensada por gamers para gamers.',
    'Encuentra el juego que más te guste entre nuestras diferentes categorías.',
];

// Tiempo entre cada letra (en milisegundos) para escribir y borrar
var tiempoEntreLetras = 100; // 0.1 segundos por letra al escribir
var tiempoEntreBorrado = 30; // Tiempo especial para el borrado del mensaje
var tiempoEntreMensajes = 5000; // 5 segundos de pausa al terminar de escribir

/* 
Creamos un cursor que parpadea para simular
el efecto de escritura de un mensaje 
*/
var cursor = document.createElement('span');
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