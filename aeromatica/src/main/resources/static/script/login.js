document.addEventListener("DOMContentLoaded", () => {
    const showPasswordIcon = document.querySelector("#showPassword");
    const hidePasswordIcon = document.querySelector("#hidePassword");
    const passwordInput = document.querySelector("#password");

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
});
