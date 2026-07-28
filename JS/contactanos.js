let formulario;
let nombreInput;
let emailInput;
let mensajeInput;

const regexIsEmpty = /^\s*$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

document.addEventListener("DOMContentLoaded", () => {
    formulario = document.getElementById("donacionesForm");
    nombreInput = document.getElementById("name");
    emailInput = document.getElementById("email");
    mensajeInput = document.getElementById("mensaje");

  //FORMATO NOMBRE
    if (nombreInput) {
        nombreInput.addEventListener("input", () => {
            let value = nombreInput.value;

            value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ. ]/g, "");

            value = value.replace(/\s+/g, " ");

            value = value.trimStart();

            nombreInput.value = value;
        });
    }

    //SUBMIT FORM
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        let valido = true;

        //nombre
        if (regexIsEmpty.test(nombreInput.value)) {
            mostrarError(nombreInput, "Ingresa tu nombre.");
            valido = false;
        } else {
            mostrarError(nombreInput, "");
        }

        //EMAIL
        const emailValue = emailInput.value.trim();

        if (regexIsEmpty.test(emailValue)) {
            mostrarError(emailInput, "Ingresa tu correo.");
            valido = false;
        } 
        else if (!regexEmail.test(emailValue)) {
            mostrarError(emailInput, "Correo inválido.");
            valido = false;
        } 
        else {
            mostrarError(emailInput, "");
        }

        //MESSAGE
        if (regexIsEmpty.test(mensajeInput.value)) {
            mostrarError(mensajeInput, "Escribe un mensaje.");
            valido = false;
        } else {
            mostrarError(mensajeInput, "");
        }

        if (!valido) return;

        procesarFormulario();
    });
});

//MOSTRAR ERROR
function mostrarError(input, mensaje) {
    let errorDiv;

    if (input.id === "name") {
        errorDiv = document.getElementById("nombreError");
    } else if (input.id === "email") {
        errorDiv = document.getElementById("emailError");
    } else {
        errorDiv = document.getElementById("mensajeError");
    }

    if (mensaje) {
        input.classList.add("error");
        errorDiv.textContent = mensaje;
    } else {
        input.classList.remove("error");
        errorDiv.textContent = "";
    }
}

//PROCESAR FORMULARIO
function procesarFormulario() {
    const btn = document.getElementById("btnEnviar");
    const mensajeEstado = document.getElementById("mensaje-mandado");

    btn.disabled = true;
    btn.textContent = "Enviando...";

    setTimeout(() => {

        const params = new URLSearchParams({
            name: nombreInput.value,
            email: emailInput.value,
            mensaje: mensajeInput.value
        });

        window.history.replaceState({}, "", "?" + params.toString());

        mensajeEstado.textContent = "Mensaje enviado correctamente";
        mensajeEstado.style.color = "green";

        //BORRAR MENSAJE
        setTimeout(() => {
            mensajeEstado.textContent = "";
        }, 3000);

        formulario.reset();

        document.getElementById("nombreError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("mensajeError").textContent = "";

        btn.disabled = false;
        btn.textContent = "Enviar";

    }, 1000);
}