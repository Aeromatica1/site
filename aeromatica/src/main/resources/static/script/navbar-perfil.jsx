const { useState, useEffect } = React;

function NavbarPiloto() {
  const [piloto, setPiloto] = useState(null);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("aeromatica_piloto");
      if (salvo) {
        setPiloto(JSON.parse(salvo));
      }
    } catch (err) {
      localStorage.removeItem("aeromatica_piloto");
    }
  }, []);

  if (!piloto || !piloto.name) {
    return (
      <a href="login.html" className="login-icon" aria-label="Login">
        <i className="fa-regular fa-circle-user"></i>
      </a>
    );
  }

  return (
    <a
      href="perfil.html"
      className="piloto-nav-badge"
      title={`Ver perfil de ${piloto.name}`}
      aria-label={`Perfil do piloto ${piloto.name}`}
    >
      <i className="fa-solid fa-plane-departure"></i>
      <span>{piloto.name}</span>
    </a>
  );
}

const navPilotoRoot = document.getElementById("nav-piloto-root");
if (navPilotoRoot) {
  ReactDOM.createRoot(navPilotoRoot).render(<NavbarPiloto />);
}