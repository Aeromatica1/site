(function () {
  const overlay = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightboxImg");
  const legendaEl = document.getElementById("lightboxCaption");
  const fecharBtn = document.getElementById("lightboxClose");
  const miniaturas = document.querySelectorAll(".midia-thumb");
  if (!overlay || !imgEl || !miniaturas.length) return;

  const IMG_VAZIA = imgEl.getAttribute("src");
  let ultimoFoco = null;

  function abrir(botao) {
    const img = botao.querySelector("img");
    const legenda = botao.closest(".midia-card")?.querySelector(".legenda")?.textContent.trim();
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt || "Imagem do Aeromática";
    legendaEl.textContent = legenda || img.alt || "";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("no-scroll");
    ultimoFoco = botao;
    fecharBtn.focus();
  }

  function fechar() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("no-scroll");
    imgEl.src = IMG_VAZIA;
    imgEl.alt = "";
    ultimoFoco?.focus();
  }

  miniaturas.forEach((botao) => botao.addEventListener("click", () => abrir(botao)));
  fecharBtn.addEventListener("click", fechar);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) fechar(); });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") fechar();
    if (e.key === "Tab") { e.preventDefault(); fecharBtn.focus(); } 
  });
})();