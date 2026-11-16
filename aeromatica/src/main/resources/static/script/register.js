document.addEventListener("DOMContentLoaded", () => {
    const showPasswordIcon = document.querySelector("#showPassword");
    const hidePasswordIcon = document.querySelector("#hidePassword");
    const passwordInput = document.querySelector("#password");
    const feedbackEl = document.getElementById("formFeedback");
    const form = document.querySelector("form");
    const message = document.getElementById("message");

    if (showPasswordIcon && hidePasswordIcon && passwordInput) {
        showPasswordIcon.addEventListener("click", () => {
            passwordInput.setAttribute("type", "text");
            showPasswordIcon.classList.add("hide");
            hidePasswordIcon.classList.remove("hide");
        });

        hidePasswordIcon.addEventListener("click", () => {
            passwordInput.setAttribute("type", "password");
            hidePasswordIcon.classList.add("hide");
            showPasswordIcon.classList.remove("hide");
        });
    }

    function mostrarFeedback(mensagem, tipo = "error") {
        if (!feedbackEl) return;
        feedbackEl.textContent = mensagem;
        feedbackEl.className = `form-feedback is-visible is-${tipo}`;
    }

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInputEl = document.getElementById("password");

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const password = passwordInputEl?.value || "";

        if (!name || !email || !password) {
            mostrarFeedback("Ops! Preencha todos os campos obrigatórios antes de continuar.", "error");
            const vazio = [nameInput, emailInput, passwordInputEl].find((el) => el && !el.value.trim());
            vazio?.focus();
            return;
        }

        mostrarFeedback("Enviando seus dados para a torre de acesso...", "success");
        if (message) message.textContent = "";

        try {
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await response.json()
                : { message: await response.text() };

            if (!response.ok || data.status === 400) {
                const erroTexto = data.message || "Não foi possível concluir o cadastro.";
                mostrarFeedback(erroTexto, "error");
                if (message) message.textContent = erroTexto;
                return;
            }

            mostrarFeedback("Conta criada com sucesso!", "success");
            if (message) {
                message.textContent = data.name && data.email
                    ? `Nome: ${data.name}. Email: ${data.email}`
                    : "Cadastro realizado!";
            }
        } catch (error) {
            mostrarFeedback(
                "Não foi possível conectar ao servidor de cadastro (/auth/register). Verifique se o backend Java está rodando e acessível nessa rota.",
                "error"
            );
        }
    });
});