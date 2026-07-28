document.addEventListener("DOMContentLoaded", () => {
    console.log("Sitio cargado");

    // Ejemplo formulario contacto
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Mensaje enviado correctamente");
        });
    }
});