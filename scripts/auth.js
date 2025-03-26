document.addEventListener("DOMContentLoaded", function () {
    /* FUNCIONAMIENTO PARA EL FORMULARIO REGISTRARSE */
    var registerForm = document.querySelector("#registerModal form");
    if (registerForm) {
        var nombreCompleto = registerForm.querySelector("#nombre-completo");
        var nombreUsuario = registerForm.querySelector("#nombre-usuario");
        var email = registerForm.querySelector("#correo");
        var fechaNacimiento = registerForm.querySelector("#fecha-nacimiento");
        var direccion = registerForm.querySelector("#direccion");
        var contraseña = registerForm.querySelector("#contraseña");
        var confirmarContraseña = registerForm.querySelector("#confirmar");
        var limpiarBtn = registerForm.querySelector("#limpiarBtn");

        // Botón para limpiar el formulario y remover mensajes de error
        if (limpiarBtn) {
            limpiarBtn.addEventListener("click", function () {
                registerForm.reset();
                clearErrors(registerForm);
            });
        }

        // Evento submit del formulario de registro
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearErrors(registerForm);
            let isValid = true;
            
            // Lista de verificacio de cada campo
            if (!nombreCompleto.value.trim()) {
                showError(nombreCompleto, "El nombre completo es obligatorio.", registerForm);
                isValid = false;
            }
            if (!nombreUsuario.value.trim()) {
                showError(nombreUsuario, "El nombre de usuario es obligatorio.", registerForm);
                isValid = false;
            }
            if (!email.value.trim() || !validateEmail(email.value)) {
                showError(email, "Ingrese un correo válido.", registerForm);
                isValid = false;
            }
            if (!fechaNacimiento.value || !validateAge(fechaNacimiento.value)) {
                showError(fechaNacimiento, "Debe tener al menos 13 años.", registerForm);
                isValid = false;
            }
            // Este campo como se decia en la semana 2 es opcional
            if (!contraseña.value.trim() || !validatePassword(contraseña.value)) {
                showError(contraseña, "La contraseña debe tener 6-18 caracteres, incluir una mayúscula y un número.", registerForm);
                isValid = false;
            }
            if (contraseña.value !== confirmarContraseña.value) {
                showError(confirmarContraseña, "Las contraseñas no coinciden.", registerForm);
                isValid = false;
            }

            // Si todas las verificaciones son validas, se simula el envío (en este caso mediante redirección)
            if (isValid) {
                var params = new URLSearchParams(new FormData(registerForm)).toString();
                var url = (registerForm.getAttribute("action") || "index.html") + "?" + params;
                window.location.href = url;
            }
        });
    }

    /* FUNCIONAMIENTO PARA EL FORMULARIO INICIAR SESION */
    var loginForm = document.querySelector("#loginModal form");
    if (loginForm) {
        // Referencias a los elementos del formulario de login
        var usuarioLogin = loginForm.querySelector("#usuarioLogin");
        var contraseñaLogin = loginForm.querySelector("#contraseñaLogin");

        // Evento submit del formulario de login
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearErrors(loginForm);
            let isValid = true;

            if (!usuarioLogin.value.trim()) {
                showError(usuarioLogin, "El usuario o correo es obligatorio.", loginForm);
                isValid = false;
            }
            if (!contraseñaLogin.value.trim()) {
                showError(contraseñaLogin, "La contraseña es obligatoria.", loginForm);
                isValid = false;
            }

            if (isValid) {
                // Aquí se puede incluir la lógica real de autenticación.
                // Por ejemplo, enviar los datos vía AJAX o redirigir a otra página.
                var params = new URLSearchParams(new FormData(loginForm)).toString();
                var url = (loginForm.getAttribute("action") || "index.html") + "?" + params;
                window.location.href = url;
            }
        });
    }

    /* FUNCIONES COMPARTIDAS */
    function showError(element, message, container) {
        element.classList.add("is-invalid");
        var errorDiv = document.createElement("div");
        errorDiv.classList.add("invalid-feedback");

        // Icono de error
        var iconSpan = document.createElement("span");
        iconSpan.classList.add("error-icon");
        iconSpan.textContent = "!";
        errorDiv.appendChild(iconSpan);
        errorDiv.insertAdjacentText("beforeend", " " + message);

        element.parentNode.insertBefore(errorDiv, element.nextSibling);

        // Listener para quitar el error al ingresar texto
        var clearError = function () {
            element.classList.remove("is-invalid");
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
            element.removeEventListener("input", clearError);
        };
        element.addEventListener("input", clearError);
    }

    // Función para limpiar todos los errores dentro de un contenedor (formulario)
    function clearErrors(container) {
        container.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
        container.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
    }

    // Validación de formato de email
    function validateEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validación de edad (al menos 13 años)
    function validateAge(fecha) {
        var birthDate = new Date(fecha);
        var today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 13;
    }

    // Validación de contraseña: 6-18 caracteres, al menos una mayúscula y un dígito
    function validatePassword(password) {
        var regex = /^(?=.*[A-Z])(?=.*\d)[\S]{6,18}$/;
        return regex.test(password);
    }
});