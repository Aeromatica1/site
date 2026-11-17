(function () {
  const form = document.getElementById("form");
  const feedback = document.getElementById("formFeedback");
  if (!form) return;

  Aeromatica.ativarToggleSenha(document.getElementById("togglePassword"), document.getElementById("password"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById("email");
    const senhaEl = document.getElementById("password");
    const email = emailEl.value.trim();
    const password = senhaEl.value;
    const botao = form.querySelector("button[type='submit']");

    if (!email || !password) {
      Aeromatica.mostrarFeedback(feedback, "Preencha e-mail e senha antes de continuar.");
      (email ? senhaEl : emailEl).focus();
      return;
    }

    let redirecionando = false;
    botao.disabled = true;
    Aeromatica.mostrarFeedback(feedback, "Verificando seus dados na torre de acesso...", "info");

    try {
      const { ok, data } = await Aeromatica.postJSON("/auth/login", { email, password });

      if (!ok || !data.name) {
        Aeromatica.mostrarFeedback(feedback, data.message || "E-mail ou senha incorretos.");
        return;
      }

      Aeromatica.salvarPiloto({
        name: data.name,
        email: data.email || email,
        patente: data.patente || "Cadete de Torre",
        dataRegistro: data.dataRegistro || "",
      });
      Aeromatica.mostrarFeedback(feedback, `${data.name}, seja bem-vindo!`, "success");
      redirecionando = true;
      setTimeout(() => { window.location.href = "index.html"; }, 1000);
    } catch (erro) {
      console.error("Falha no login:", erro);
      Aeromatica.mostrarFeedback(feedback, "Não foi possível conectar ao servidor. Tente novamente em instantes.");
    } finally {
      if (!redirecionando) botao.disabled = false;
    }
  });
})();