const { useState, useEffect } = React;

function PerfilAeromatica() {
  const [piloto, setPiloto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("aeromatica_piloto");
      if (salvo) {
        setPiloto(JSON.parse(salvo));
      }
    } catch (err) {
      localStorage.removeItem("aeromatica_piloto");
    } finally {
      setCarregando(false);
    }
  }, []);

  const sairDaConta = () => {
    localStorage.removeItem("aeromatica_piloto");
    setPiloto(null);
    window.location.href = "login.html";
  };

  if (carregando) {
    return (
      <section className="perfil-card">
        <p>Carregando ficha do piloto...</p>
      </section>
    );
  }

  if (!piloto || !piloto.name) {
    return (
      <section className="perfil-card">
        <div className="perfil-avatar">
          <i className="fa-solid fa-user-lock"></i>
        </div>
        <h1>Acesso Restrito</h1>
        <p className="perfil-subtitulo">
          Você ainda não está autenticado na torre de controle.
        </p>
        <div className="perfil-acoes">
          <a href="login.html" className="btn-perfil-primario">
            Fazer Login
          </a>
          <a href="register.html" className="btn-perfil-sair">
            Criar Conta
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="perfil-card" aria-label="Informações do piloto">
      <div className="perfil-avatar">
        <i className="fa-solid fa-user-astronaut"></i>
      </div>
      <h1>{piloto.name}</h1>
      <p className="perfil-subtitulo">Ficha oficial do piloto no Aeromática</p>

      <div className="perfil-info-lista">
        <div className="perfil-info-item">
          <span className="perfil-info-label">Nome de usuário</span>
          <span className="perfil-info-valor">{piloto.name}</span>
        </div>

        <div className="perfil-info-item">
          <span className="perfil-info-label">E-mail cadastrado</span>
          <span className="perfil-info-valor">{piloto.email || "Não informado"}</span>
        </div>

        <div className="perfil-info-item">
          <span className="perfil-info-label">Patente operacional</span>
          <span className="perfil-info-valor">{piloto.patente || "Cadete de Torre"}</span>
        </div>

        <div className="perfil-info-item">
          <span className="perfil-info-label">Registrado em</span>
          <span className="perfil-info-valor">{piloto.dataRegistro || "Hoje"}</span>
        </div>
      </div>

      <div className="perfil-acoes">
        <a href="index.html" className="btn-perfil-primario">
          Voltar ao Simulador
        </a>
        <button type="button" className="btn-perfil-sair" onClick={sairDaConta}>
          Sair da conta
        </button>
      </div>
    </section>
  );
}

const perfilRoot = document.getElementById("perfil-aeromatica-root");
if (perfilRoot) {
  ReactDOM.createRoot(perfilRoot).render(<PerfilAeromatica />);
}