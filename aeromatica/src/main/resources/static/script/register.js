(function () {
  const form = document.getElementById("form");
  const feedback = document.getElementById("formFeedback");
  if (!form) return;

  const MIN_SENHA = 8; 
  Aeromatica.ativarToggleSenha(document.getElementById("togglePassword"), document.getElementById("password"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const senhaEl = document.getElementById("password");
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const password = senhaEl.value;
    const botao = form.querySelector("button[type='submit']");

    const erro =
      !name ? [nameEl, "Informe um nome de usuário."] :
      !email ? [emailEl, "Informe seu e-mail."] :
      !Aeromatica.EMAIL_REGEX.test(email) ? [emailEl, "Digite um e-mail válido."] :
      !password ? [senhaEl, "Crie uma senha."] :
      password.length < MIN_SENHA ? [senhaEl, `A senha precisa ter pelo menos ${MIN_SENHA} caracteres.`] :
      null;

    if (erro) {
      Aeromatica.mostrarFeedback(feedback, erro[1]);
      erro[0].focus();
      return;
    }

    botao.disabled = true; // evita criar a conta duas vezes
    Aeromatica.mostrarFeedback(feedback, "Enviando seus dados para a torre de acesso...", "info");

    try {
      const { ok, data } = await Aeromatica.postJSON("/auth/register", { name, email, password });

      if (!ok) {
        Aeromatica.mostrarFeedback(feedback, data.message || "Não foi possível concluir o cadastro.");
        botao.disabled = false;
        return;
      }

      Aeromatica.salvarPiloto({
        name: data.name || name,
        email: data.email || email,
        patente: data.patente || "Cadete de Torre",
        dataRegistro: data.dataRegistro || new Date().toLocaleDateString("pt-BR"),
      });
      Aeromatica.mostrarFeedback(feedback, "Conta criada com sucesso!", "success");
      setTimeout(() => { window.location.href = "perfil.html"; }, 900);
    } catch (err) {
      console.error("Falha no cadastro (/auth/register):", err);
      Aeromatica.mostrarFeedback(feedback, "Não foi possível conectar ao servidor. Tente novamente em instantes.");
      botao.disabled = false;
    }
  });
})();