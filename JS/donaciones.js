let formulario;
let montoInput;
let metodoSelect;
let mensaje;
let botonesMonto;

let cardFields;
let paypalFields;


//===expreciones regex===//
const regexIsEmpty = /^\s*$/;

const regexCardNumber = /^(?:\d{4}\s){3}\d{4}$|^\d{16}$/;
const regexCardName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+){1,3}$/;
const regexExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/;
const regexCVV = /^\d{3,4}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//=========================================================//

document.addEventListener("DOMContentLoaded", () => {

    formulario = document.getElementById("donacionesForm");
    montoInput = document.getElementById("monto");
    metodoSelect = document.getElementById("donaciones-metodo");
    mensaje = document.getElementById("donaciones-mensaje");
    botonesMonto = document.querySelectorAll("#montosContainer button");

    cardFields = document.getElementById("cardFields");
    paypalFields = document.getElementById("paypalFields");

    //monto - SOLO NÚMEROS
    montoInput.addEventListener("input", () => {
        montoInput.value = montoInput.value.replace(/[^0-9]/g, "");
    });

    //monto BOTONES
    botonesMonto.forEach(btn => {
        btn.addEventListener("click", () => {
            montoInput.value = btn.dataset.monto;
        });
    });

    //FORMATO DEL TARJETA
    const cardNumberInput = document.getElementById("cardNumber");

    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", () => {
            let value = cardNumberInput.value.replace(/\D/g, "");
            value = value.match(/.{1,4}/g)?.join(" ") || "";
            if (value.length > 3) value = value.slice(0, 19);
            cardNumberInput.value = value;
        });
    }

    //FORMATO DEL NOMBRE
    const cardNameInput = document.getElementById("cardName");

    if (cardNameInput) {
        cardNameInput.addEventListener("input", () => {
            let value = cardNameInput.value;

            value = value.replace(/[^A-Za-z ]/g, "");

            value = value.replace(/\s+/g, " ").trimStart();

            let words = value.split(" ");

            if (words.length > 4) {
                words = words.slice(0, 4);
            }

            value = words.join(" ");

            cardNameInput.value = value;
        });
    }

    //cortar CVV
    const cardCvvInput = document.getElementById("cardCVV");

    if (cardCvvInput) {
        cardCvvInput.addEventListener("input", () => {
            let value = cardCvvInput.value.replace(/\D/g, "");
            if (value.length > 3) value = value.slice(0, 3);
            cardCvvInput.value = value;
        });
    }

    // cortar y formatear EXPIRY DATE
    const cardExpiryInput = document.getElementById("cardExpiry");

    if (cardExpiryInput) {
        cardExpiryInput.addEventListener("input", () => {
            let value = cardExpiryInput.value.replace(/\D/g, "");
            if (value.length > 4) value = value.slice(0, 4);
            if (value.length >= 3) {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
            cardExpiryInput.value = value;
        });
    }

    //EL METODO
    metodoSelect.addEventListener("change", () => {

        cardFields.style.display = "none";
        paypalFields.style.display = "none";

        limpiarErrores();

        if (metodoSelect.value === "card") {
            cardFields.style.display = "flex";
        }

        if (metodoSelect.value === "paypal") {
            paypalFields.style.display = "flex";
        }

        actualizarBotones();
    });

    //boton SUBMIT
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        limpiarErrores();

        let errores = {};
        let valido = true;

        //mensaje de error del MONTO
        if (regexIsEmpty.test(montoInput.value) || Number(montoInput.value) <= 0) {
            errores.montoError = {
                error: "Ingresa un monto válido.",
                input: montoInput
            };
            valido = false;
        }

        //mensaje de error del MÉTODO
        if (regexIsEmpty.test(metodoSelect.value)) {
            errores.metodoError = {
                error: "Selecciona un método de pago.",
                input: metodoSelect
            };
            valido = false;
        }

        //mensaje de error del TARJETA
        if (metodoSelect.value === "card") {

            const cardNumber = document.getElementById("cardNumber");
            const cardName = document.getElementById("cardName");
            const cardExpiry = document.getElementById("cardExpiry");
            const cardCVV = document.getElementById("cardCVV");

            const cleanCardNumber = cardNumber.value.replace(/\s/g, "");

            if (!regexCardNumber.test(cardNumber.value) && !regexCardNumber.test(cleanCardNumber)) {
                errores.cardNumberError = {
                    error: "Número de tarjeta inválido.",
                    input: cardNumber
                };
                valido = false;
            }

            if (!regexCardName.test(cardName.value)) {
                errores.cardNameError = {
                    error: "Nombre inválido.",
                    input: cardName
                };
                valido = false;
            }

            if (!regexExpiry.test(cardExpiry.value.trim())) {
                errores.cardExpiryError = {
                    error: "Fecha inválida (MM/YY).",
                    input: cardExpiry
                };
                valido = false;
            }

            if (!regexCVV.test(cardCVV.value)) {
                errores.cardCvvError = {
                    error: "CVV inválido.",
                    input: cardCVV
                };
                valido = false;
            }
        }

        //mensaje de error del PAYPAL
        if (metodoSelect.value === "paypal") {

            const paypalEmail = document.getElementById("paypalEmail");

            if (!regexEmail.test(paypalEmail.value)) {
                errores.paypalError = {
                    error: "Correo inválido.",
                    input: paypalEmail
                };
                valido = false;
            }
        }

        if (!valido) {
            mostrarErrores(errores);
            return;
        }

        procesarDonacion();
    });

    // para iniciar los botones principales en LEMPIRAS
    actualizarBotones();
});

// funcion para ERRORES
function mostrarErrores(errores) {

    Object.values(errores).forEach(obj => {

        obj.input.classList.add("error");

        let div = document.createElement("div");
        div.classList.add("error-text");
        div.innerText = obj.error;

        obj.input.insertAdjacentElement("afterend", div);
    });
}

//funcion para LIMPIAR
function limpiarErrores() {
    document.querySelectorAll(".error-text").forEach(e => e.remove());
    document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
}

//BOTONES DINÁMICOS -> funcion para cambiar el valor y nombre de los botones
function actualizarBotones() {

    const valoresTarjeta = [100, 300, 500, 1000];
    const valoresPaypal = [5, 10, 25, 50];

    const esPaypal = metodoSelect.value === "paypal";

    botonesMonto.forEach((btn, index) => {

        if (esPaypal) {
            btn.dataset.monto = valoresPaypal[index];
            btn.textContent = "$" + valoresPaypal[index];
        } else {
            btn.dataset.monto = valoresTarjeta[index];
            btn.textContent = "L" + valoresTarjeta[index];
        }
    });
}

// funcion para el mensaje de PROCESO
function procesarDonacion() {

    mensaje.style.color = "black";
    mensaje.textContent = "Procesando donación...";

    const params = new URLSearchParams({
        monto: montoInput.value,
        metodo: metodoSelect.value
    });

    window.history.replaceState({}, "", "?" + params.toString());

    //funcion para simular el proseso de "Loading..." para luego decir si el pago fue exitoso o no
    setTimeout(() => {

        let simbolo = metodoSelect.value === "card" ? "L" : "$";
        let metodoTexto = metodoSelect.value === "card" ? "Tarjeta" : "PayPal";

        mensaje.style.color = "green";
        mensaje.textContent =
            "Donación exitosa de " + simbolo + montoInput.value + " vía " + metodoTexto;

        formulario.reset();
        limpiarErrores();
        cardFields.style.display = "none";
        paypalFields.style.display = "none";

        actualizarBotones();

    }, 1000);
}