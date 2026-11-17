(function () {
  const CHAVE = "aeromatica_piloto";
  const API_URL = ""; // mesma origem
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getPiloto() {
    try {
      const piloto = JSON.parse(localStorage.getItem(CHAVE));
      return piloto && piloto.name ? piloto : null;
    } catch {
      try { localStorage.removeItem(CHAVE); } catch {}
      return null;
    }
  }

  function salvarPiloto(piloto) {
    try { localStorage.setItem(CHAVE, JSON.stringify(piloto)); } catch {}
  }

  function sair() {
    // encerra a sessão no servidor (se a rota existir) e limpa o navegador
    fetch(API_URL + "/auth/logout", { method: "POST", keepalive: true }).catch(() => {});
    try { localStorage.removeItem(CHAVE); } catch {}
  }

  // POST em JSON. Só lê "message" quando a resposta é JSON
  async function postJSON(caminho, corpo) {
    const resposta = await fetch(API_URL + caminho, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(corpo),
    });
    const ehJson = (resposta.headers.get("content-type") || "").includes("application/json");
    const data = ehJson ? await resposta.json().catch(() => ({})) : {};
    return { ok: resposta.ok && !(data.status >= 400), data };
  }

  function mostrarFeedback(el, mensagem, tipo = "error") {
    if (!el) return;
    el.textContent = mensagem;
    el.className = `form-feedback is-visible is-${tipo}`;
  }

  function ativarToggleSenha(botao, input) {
    if (!botao || !input) return;
    botao.addEventListener("click", () => {
      const mostrar = input.type === "password";
      input.type = mostrar ? "text" : "password";
      botao.setAttribute("aria-pressed", String(mostrar));
      botao.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
      const icone = botao.querySelector("i");
      if (icone) {
        icone.classList.toggle("fa-eye", !mostrar);
        icone.classList.toggle("fa-eye-slash", mostrar);
      }
    });
  }

  window.Aeromatica = { getPiloto, salvarPiloto, sair, postJSON, mostrarFeedback, ativarToggleSenha, EMAIL_REGEX };
})();