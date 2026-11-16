document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("lightbox");
    const imgEl = document.getElementById("lightboxImg");
    const captionEl = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    const cards = document.querySelectorAll(".midia-card img");

    if (!overlay || !imgEl || !cards.length) return;

    const abrirLightbox = (img) => {
        imgEl.src = img.src;
        imgEl.alt = img.alt || "Imagem do Aeromática";
        const card = img.closest(".midia-card");
        const legendaExtra = card?.querySelector("p, figcaption")?.textContent?.trim();
        captionEl.textContent = legendaExtra || img.alt || "";
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
    };

    const fecharLightbox = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        imgEl.src = "";
    };

    cards.forEach((img) => {
        img.addEventListener("click", () => abrirLightbox(img));
    });

    closeBtn?.addEventListener("click", fecharLightbox);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) fecharLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            fecharLightbox();
        }
    });
});