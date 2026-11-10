document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        elementos.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entradas, obs) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;

                entrada.target.classList.add("visible");
                obs.unobserve(entrada.target);
            });
        },
        {
            threshold: 0.15,                    
            rootMargin: "0px 0px -50px 0px"     
        }
    );

    elementos.forEach((el) => observer.observe(el));
});