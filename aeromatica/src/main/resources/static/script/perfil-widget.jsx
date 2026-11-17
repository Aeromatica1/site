(function () {
  const { useState, useEffect } = React;

  function PerfilAeromatica() {
    const [piloto, setPiloto] = useState(() => Aeromatica.getPiloto());

    useEffect(() => {
      const atualizar = () => setPiloto(Aeromatica.getPiloto()); // login/logout em outra aba
      window.addEventListener("storage", atualizar);
      return () => window.removeEventListener("storage", atualizar);
    }, []);

    const sairDaConta = () => {
      Aeromatica.sair();
      window.location.href = "login.html";
    };

    if (!piloto) {
      return (
        <section className="perfil-card">
          <div className="perfil-avatar"><i className="fa-solid fa-user-lock" aria-hidden="true"></i></div>
          <h1>Acesso Restrito</h1>
          <p className="perfil-subtitulo">Você ainda não está autenticado na torre de controle.</p>
          <div className="perfil-acoes">
            <a href="login.html" className="btn-perfil-primario">Fazer Login</a>
            <a href="register.html" className="btn-perfil-sair">Criar Conta</a>
          </div>
        </section>
      );
    }

    const itens = [
      ["Nome de usuário", piloto.name],
      ["E-mail cadastrado", piloto.email || "Não informado"],
      ["Patente operacional", piloto.patente || "Cadete de Torre"],
      piloto.dataRegistro ? ["Registrado em", piloto.dataRegistro] : null,
    ].filter(Boolean);

    return (
      <section className="perfil-card" aria-label="Informações do piloto">
        <div className="perfil-avatar"><i className="fa-solid fa-user-astronaut" aria-hidden="true"></i></div>
        <h1>{piloto.name}</h1>
        <p className="perfil-subtitulo">Piloto da Aeromática</p>

        <div className="perfil-info-lista">
          {itens.map(([rotulo, valor]) => (
            <div className="perfil-info-item" key={rotulo}>
              <span className="perfil-info-label">{rotulo}</span>
              <span className="perfil-info-valor">{valor}</span>
            </div>
          ))}
        </div>

        <div className="perfil-acoes">
          <a href="index.html" className="btn-perfil-primario">Voltar para a página principal</a>
          <button type="button" className="btn-perfil-sair" onClick={sairDaConta}>Sair da conta</button>
        </div>
      </section>
    );
  }

  const raiz = document.getElementById("perfil-aeromatica-root");
  if (raiz) ReactDOM.createRoot(raiz).render(<PerfilAeromatica />);
})();