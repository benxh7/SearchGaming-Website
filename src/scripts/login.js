/* -----------------------
    Script Iniciar Sesion
   ----------------------- */
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