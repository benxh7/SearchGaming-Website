document.addEventListener("DOMContentLoaded", function () {
    /* FUNCIONAMIENTO PARA EL FORMULARIO REGISTRARSE */
    var formularioRegistro = document.querySelector("#registerModal form");
    if (formularioRegistro) {
        var nombreCompleto = formularioRegistro.querySelector("#nombre-completo");
        var nombreUsuario = formularioRegistro.querySelector("#nombre-usuario");
        var email = formularioRegistro.querySelector("#correo");
        var fechaNacimiento = formularioRegistro.querySelector("#fecha-nacimiento");
        var direccion = formularioRegistro.querySelector("#direccion");
        var contraseña = formularioRegistro.querySelector("#contraseña");
        var confirmarContraseña = formularioRegistro.querySelector("#confirmar");
        var limpiarBtn = formularioRegistro.querySelector("#limpiarBtn");

        // Botón para limpiar el formulario y remover mensajes de error
        if (limpiarBtn) {
            limpiarBtn.addEventListener("click", function () {
                formularioRegistro.reset();
                limpiarErrores(formularioRegistro);
            });
        }

        // Evento submit del formulario de registro
        formularioRegistro.addEventListener("submit", function (event) {
            event.preventDefault();
            limpiarErrores(formularioRegistro);
            let isValid = true;

            // Lista de verificacio de cada campo
            if (!nombreCompleto.value.trim()) {
                mostrarError(nombreCompleto, "El nombre completo es obligatorio.", formularioRegistro);
                isValid = false;
            }
            if (!nombreUsuario.value.trim()) {
                mostrarError(nombreUsuario, "El nombre de usuario es obligatorio.", formularioRegistro);
                isValid = false;
            }
            if (!email.value.trim() || !validarCorreo(email.value)) {
                mostrarError(email, "Ingrese un correo válido.", formularioRegistro);
                isValid = false;
            }
            if (!fechaNacimiento.value || !validarEdad(fechaNacimiento.value)) {
                mostrarError(fechaNacimiento, "Debe tener al menos 13 años.", formularioRegistro);
                isValid = false;
            }
            // Este campo como se decia en la semana 2 es opcional
            if (!contraseña.value.trim() || !validarContraseña(contraseña.value)) {
                mostrarError(contraseña, "La contraseña debe tener 6-18 caracteres, incluir una mayúscula y un número.", formularioRegistro);
                isValid = false;
            }
            if (contraseña.value !== confirmarContraseña.value) {
                mostrarError(confirmarContraseña, "Las contraseñas no coinciden.", formularioRegistro);
                isValid = false;
            }

            // Si todas las verificaciones son validas, se simula el envío (en este caso mediante redirección)
            if (isValid) {
                var params = new URLSearchParams(new FormData(formularioRegistro)).toString();
                var url = (formularioRegistro.getAttribute("action") || "index.html") + "?" + params;
                window.location.href = url;
            }
        });
    }

    /* FUNCIONAMIENTO PARA EL FORMULARIO INICIAR SESION */
    var formularioLogin = document.querySelector("#loginModal form");
    if (formularioLogin) {
        // Referencias a los elementos del formulario de login
        var usuarioLogin = formularioLogin.querySelector("#usuarioLogin");
        var contraseñaLogin = formularioLogin.querySelector("#contraseñaLogin");

        // Evento submit del formulario de login
        formularioLogin.addEventListener("submit", function (event) {
            event.preventDefault();
            limpiarErrores(formularioLogin);
            let isValid = true;

            if (!usuarioLogin.value.trim()) {
                mostrarError(usuarioLogin, "El usuario o correo es obligatorio.", formularioLogin);
                isValid = false;
            }
            if (!contraseñaLogin.value.trim()) {
                mostrarError(contraseñaLogin, "La contraseña es obligatoria.", formularioLogin);
                isValid = false;
            }

            if (isValid) {
                // Aquí se puede incluir la lógica real de autenticación.
                // Por ejemplo, enviar los datos vía AJAX o redirigir a otra página.
                var params = new URLSearchParams(new FormData(formularioLogin)).toString();
                var url = (formularioLogin.getAttribute("action") || "index.html") + "?" + params;
                window.location.href = url;
            }
        });
    }

    /* FUNCIONAMIENTO PARA EL FORMULARIO RECUPERACIÓN DE CONTRASEÑA */
    var formularioContraseña = document.getElementById("recoverForm");
    if (formularioContraseña) {
        formularioContraseña.addEventListener("submit", function (event) {
            event.preventDefault();
            limpiarErrores(formularioContraseña);
            var emailRecuperacion = document.getElementById("recoverEmail");

            if (!emailRecuperacion.value.trim() || !validarCorreo(emailRecuperacion.value)) {
                mostrarError(emailRecuperacion, "Ingrese un correo válido.", formularioContraseña);
                return;
            }

            // Mostramos la alerta de Bootstrap
            var alertaCodigo = document.getElementById("recoverMessage");
            alertaCodigo.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                'Código de recuperación enviado a ' + emailRecuperacion.value +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                '</div>';

            formularioContraseña.reset();

            // Ocultar el modal y limpiar el mensaje después de 5 segundos
            setTimeout(function () {
                alertaCodigo.innerHTML = "";
                var recoverModalEl = document.getElementById("recoverPasswordModal");
                var recoverModal = bootstrap.Modal.getInstance(recoverModalEl);
                if (recoverModal) {
                    recoverModal.hide();
                }
            }, 5000);
        });
    }

    /* FUNCIONES COMPARTIDAS */
    function mostrarError(element, message, container) {
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
    function limpiarErrores(container) {
        container.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
        container.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
    }

    // Validación de formato de email
    function validarCorreo(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validación de edad (al menos 13 años)
    function validarEdad(fecha) {
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
    function validarContraseña(password) {
        var regex = /^(?=.*[A-Z])(?=.*\d)[\S]{6,18}$/;
        return regex.test(password);
    }
});