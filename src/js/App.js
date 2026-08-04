document.addEventListener("DOMContentLoaded", () => {
    console.log("Sitio cargado");

    // Ejemplo formulario contacto
    const form = document.getElementById("contactForm");
    const path = window.location.pathname.toLowerCase();
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Mensaje enviado correctamente");
        });
    }

    //para agregar la clase active al link del menú correspondiente a la página actual
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href").toLowerCase();

        if (
            (href === "index.html" && (path.endsWith("/") || path.endsWith("/index.html"))) ||
            path.endsWith("/" + href)
        ) {
            link.classList.add("active");
        }
    });
});