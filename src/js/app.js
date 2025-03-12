// Seleccionamos el elemento donde se mostrará el mensaje
const mensajeElemento = document.querySelector('.mensaje-dinamico');

// Mensajes dinamicos que mostraremos en el inicio de nuestra pagina
const mensajes = [
    'Encuentra los mejores juegos y comunidad con nosotros',
    'Pensada por gamers para gamers.',
    'Encuentra el juego que mas te guste entre diferentes categorías.',
];

// Establecemos el tiempo que pasará entre cada letra (en milisegundos)
const tiempoEntreLetras = 100; // 100 equivalen a 0.1 segundos
const tiempoEntreMensajes = 5000; // 5000 equivalen a 5 segundos

// Creamos un cursor que parpadea para simular el efecto de escritura
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.style.animation = 'parpadeo 0.8s infinite step-start'; // Añadimos un parpadeo al cursor
mensajeElemento.appendChild(cursor);

/* 
Esta funcion se encargara de escribir el mensaje letra por letra
para darle un toque de escritura a los mensajes. 
*/
function escribirMensaje(mensaje, indiceMensaje) {
    let i = 0;
    mensajeElemento.textContent = ''; // Limpiamos el contenido del texto para enviar el otro mensaje
    mensajeElemento.appendChild(cursor); // Nos aseguramos de agregar el cursor

    /*
    Esta función se encarga de escribir el mensaje letra por letra
    y llamar a la función de nuevo después de un determinado tiempo.
    */
    const escribir = () => {
        if (i < mensaje.length) {
            mensajeElemento.textContent = mensaje.substring(0, i + 1); // Escribe las letras hasta el índice actual
            mensajeElemento.appendChild(cursor); // Vuelve a agregar el cursor en cada paso
            i++;
            setTimeout(escribir, tiempoEntreLetras); // Espera antes de escribir la siguiente letra
        } else {
            // Esperamos un tiempo antes de mostrar el siguiente mensaje
            setTimeout(() => {
                indiceMensaje = (indiceMensaje + 1) % mensajes.length; // Ciclo de mensajes
                escribirMensaje(mensajes[indiceMensaje], indiceMensaje); // Escribe el siguiente mensaje
            }, tiempoEntreMensajes);
        }
    };

    escribir(); // Inicia el efecto de escritura
}

// Llamamos a la función para comenzar a escribir el primer mensaje
escribirMensaje(mensajes[0], 0);