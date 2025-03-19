document.addEventListener("DOMContentLoaded", function() {
    // Ya no necesitamos obtener el botón de "loginBtn" ni "closeLogin"
    const form = document.querySelector("#loginModal form");
    const limpiarBtn = document.getElementById("limpiarBtn");

    const nombreCompleto = document.getElementById("nombre-completo");
    const nombreUsuario = document.getElementById("nombre-usuario");
    const email = document.getElementById("correo");
    const fechaNacimiento = document.getElementById("fecha-nacimiento");
    const direccion = document.getElementById("direccion");
    const contraseña = document.getElementById("contraseña");
    const confirmarContraseña = document.getElementById("confirmar");

    // Botón para limpiar el formulario y remover mensajes de error
    limpiarBtn.addEventListener("click", function() {
        form.reset();
        clearErrors();
    });

    // Evento submit del formulario (validación y envío GET)
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        clearErrors();
        let isValid = true;

        // Validaciones
        if (!nombreCompleto.value.trim()) {
            showError(nombreCompleto, "El nombre completo es obligatorio.");
            isValid = false;
        }

        if (!nombreUsuario.value.trim()) {
            showError(nombreUsuario, "El nombre de usuario es obligatorio.");
            isValid = false;
        }

        if (!email.value.trim() || !validateEmail(email.value)) {
            showError(email, "Ingrese un correo válido.");
            isValid = false;
        }

        if (!fechaNacimiento.value || !validateAge(fechaNacimiento.value)) {
            showError(fechaNacimiento, "Debe tener al menos 13 años.");
            isValid = false;
        }

        // La dirección es opcional, por lo que no se valida
        if (!contraseña.value.trim() || !validatePassword(contraseña.value)) {
            showError(contraseña, "La contraseña debe tener 6-18 caracteres, incluir una mayúscula y un número.");
            isValid = false;
        }
        
        if (contraseña.value !== confirmarContraseña.value) {
            showError(confirmarContraseña, "Las contraseñas no coinciden.");
            isValid = false;
        }

        // Si todo es válido, se envían los datos vía GET y se redirige
        if (isValid) {
            const params = new URLSearchParams(new FormData(form)).toString();
            const url = (form.getAttribute("action") || "index.html") + "?" + params;
            window.location.href = url;
        }
    });

    // Función para mostrar mensajes de error
    function showError(element, message) {
        element.classList.add("is-invalid");
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("invalid-feedback");
    
        // Creamos el icono de error: un span que contendrá la exclamación
        const iconSpan = document.createElement("span");
        iconSpan.classList.add("error-icon");
        iconSpan.textContent = "!";
        
        // Añadimos el icono y el mensaje al div de error
        errorDiv.appendChild(iconSpan);
        errorDiv.insertAdjacentText("beforeend", " " + message);
        
        // Insertamos el mensaje de error justo después del campo de entrada
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
        
        // Listener para quitar el error cuando se ingrese texto
        const clearError = function() {
            element.classList.remove("is-invalid");
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
            element.removeEventListener("input", clearError);
        };
        element.addEventListener("input", clearError);
    }

    // Función para limpiar los mensajes de error
    function clearErrors() {
        document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
        document.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
    }

    // Función para validar el formato de email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Función para validar que el usuario tenga al menos 13 años
    function validateAge(fecha) {
        const birthDate = new Date(fecha);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 13;
    }

    // Función para validar la contraseña: 6-18 caracteres, al menos una mayúscula y un dígito
    function validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)[\S]{6,18}$/;
        return regex.test(password);
    }
});