document.addEventListener("DOMContentLoaded", () => {
    const showPasswordIcon = document.querySelector("#showPassword");
    const hidePasswordIcon = document.querySelector("#hidePassword");
    const passwordInput = document.querySelector("#password");
    const form = document.getElementById("form");
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

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const payload = {
            email: email,
            password: password
        }

        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();

        if (data.name) {
            message.innerText = data.name + ", seja bem-vindo!";
            setTimeout(() => {
                window.location.href = "/index.html"
            }, 3000)
        }
    })

});
