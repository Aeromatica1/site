const { useState } = React;

function SimuladorAeromatica() {
  const [pistas, setPistas] = useState(2);
  const [voosFila, setVoosFila] = useState(5);

  const alterarPistas = (delta) => {
    setPistas((atual) => Math.min(6, Math.max(1, atual + delta)));
  };

  const alterarVoos = (delta) => {
    setVoosFila((atual) => Math.min(20, Math.max(0, atual + delta)));
  };

  const resetar = () => {
    setPistas(2);
    setVoosFila(5);
  };

  return (
    <div className="simulador-box">
      <div className="simulador-controles">
        <div className="controle-grupo">
          <span className="controle-label">Pistas ativas</span>
          <div className="controle-botoes">
            <button
              type="button"
              className="btn-ajuste"
              onClick={() => alterarPistas(-1)}
              aria-label="Diminuir pistas"
            >
              -
            </button>
            <strong className="controle-valor">{pistas}</strong>
            <button
              type="button"
              className="btn-ajuste"
              onClick={() => alterarPistas(1)}
              aria-label="Aumentar pistas"
            >
              +
            </button>
          </div>
        </div>

        <div className="controle-grupo">
          <span className="controle-label">Voos na fila</span>
          <div className="controle-botoes">
            <button
              type="button"
              className="btn-ajuste"
              onClick={() => alterarVoos(-1)}
              aria-label="Diminuir voos na fila"
            >
              -
            </button>
            <strong className="controle-valor">{voosFila}</strong>
            <button
              type="button"
              className="btn-ajuste"
              onClick={() => alterarVoos(1)}
              aria-label="Aumentar voos na fila"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div id="simulador-painel-dados"></div>

      <div className="simulador-rodape-acoes">
        <button type="button" className="btn-sec simulador-reset" onClick={resetar}>
          Resetar cenário
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("simulador-aeromatica");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<SimuladorAeromatica />);
}