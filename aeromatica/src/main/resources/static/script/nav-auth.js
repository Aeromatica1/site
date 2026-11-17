(function () {
  function el(tag, atributos = {}, filhos = []) {
    const e = document.createElement(tag);
    Object.entries(atributos).forEach(([k, v]) => e.setAttribute(k, v));
    filhos.forEach((f) => e.append(f));
    return e;
  }

  function renderizar() {
    const piloto = Aeromatica.getPiloto();

    const nav = document.getElementById("nav-piloto-root");
    if (nav) {
      nav.replaceChildren(
        piloto
          ? el("a", { href: "perfil.html", class: "piloto-nav-badge", title: `Ver perfil de ${piloto.name}`, "aria-label": `Perfil do piloto ${piloto.name}` }, [
              el("i", { class: "fa-solid fa-plane-departure", "aria-hidden": "true" }),
              el("span", {}, [piloto.name]),
            ])
          : el("a", { href: "login.html", class: "login-icon", "aria-label": "Login" }, [
              el("i", { class: "fa-regular fa-circle-user", "aria-hidden": "true" }),
            ])
      );
    }

    const itemRodape = document.getElementById("footer-auth-link");
    if (itemRodape) {
      itemRodape.replaceChildren(
        el("a", { href: piloto ? "perfil.html" : "login.html" }, [piloto ? "Meu Perfil" : "Login"])
      );
    }
  }

  renderizar();
  window.addEventListener("storage", renderizar); // login/logout em outra aba
})();