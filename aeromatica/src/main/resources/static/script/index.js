document.addEventListener("DOMContentLoaded", () => {
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    const linksNav = document.querySelectorAll(".area-nav a[href]");

    linksNav.forEach((link) => {
        const destino = link.getAttribute("href");
        if (destino === paginaAtual && !link.classList.contains("btn-nav") && !link.classList.contains("titulo-link")) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});