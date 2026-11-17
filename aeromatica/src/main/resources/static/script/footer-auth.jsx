const { useState, useEffect } = React;

function FooterAuthLink() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("aeromatica_piloto");
      if (salvo) {
        const piloto = JSON.parse(salvo);
        if (piloto && piloto.name) {
          setLogado(true);
        }
      }
    } catch (err) {
      setLogado(false);
    }
  }, []);

  if (logado) {
    return (
      <li>
        <a href="perfil.html">Meu Perfil</a>
      </li>
    );
  }

  return (
    <li>
      <a href="login.html">Login</a>
    </li>
  );
}

const footerAuthRoot = document.getElementById("footer-auth-link");
if (footerAuthRoot) {
  ReactDOM.createRoot(footerAuthRoot).render(<FooterAuthLink />);
}