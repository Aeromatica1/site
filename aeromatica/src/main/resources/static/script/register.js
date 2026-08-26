document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const message = document.getElementById("message");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const payload = {
            "name": name,
            "email": email,
            "password": password,
        };

        const request = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        const response = await request.json();

        if (response.status === 400) {
            message.innerText = response.message;
        } else {
            message.innerText = "Nome: " + response.name + ". Email: " + response.email;
        }

        console.log(response);
    })
})