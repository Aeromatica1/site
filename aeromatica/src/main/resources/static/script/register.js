document.addEventListener("DOMContentLoaded", () => {
    const showPasswordIcon = document.querySelector("#showPassword");
    const hidePasswordIcon = document.querySelector("#hidePassword");
    const passwordInput = document.querySelector("#password");
    const feedbackEl = document.getElementById("formFeedback");
    const form = document.querySelector('form');
    const message = document.getElementById("message");

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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const payload = {
            name: name,
            email: email,
            password: password
        };

        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (data.status === 400) {
            message.innerText = data.message;
        } else {
            message.innerText = "Nome: " + data.name + ". Email: " + data.email;
        }
    })

   function mostrarFeedback(mensagem, tipo = "error") {
        if (!feedbackEl) return;
        feedbackEl.textContent = mensagem;
        feedbackEl.className = `form-feedback is-visible is-${tipo}`;
    }

        if (form) {
            form.addEventListener("submit", (event) => {
                const inputs = [...form.querySelectorAll("input[required], input[type='email'], input[type='password'], input[type='text']")];
                const campoVazio = inputs.find((input) => !input.value.trim());

            if (campoVazio) {
                event.preventDefault();
                mostrarFeedback("Ops! Preencha todos os campos obrigatórios antes de continuar.", "error");
                campoVazio.focus();
                return;
            }

            mostrarFeedback("Tudo certo! Verificando seus dados na torre de acesso...", "success");
        });
    }
 
});
