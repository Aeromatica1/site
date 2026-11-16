const { useState, useMemo } = React;

const CAPACIDADE_POR_PISTA = 3;
const RECEITA_POR_VOO = 420;
const CUSTO_POR_PISTA = 250;
const TEMPO_BASE_MIN = 8;

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

  const metricas = useMemo(() => {
    const capacidadeTotal = pistas * CAPACIDADE_POR_PISTA;
    const ocupacao = Math.min(100, Math.round((voosFila / capacidadeTotal) * 100));
    const voosAtendidos = Math.min(voosFila, capacidadeTotal);
    const excessoFila = Math.max(0, voosFila - capacidadeTotal);
    const tempoEspera = TEMPO_BASE_MIN + excessoFila * 6;
    const lucroEstimado = voosAtendidos * RECEITA_POR_VOO - pistas * CUSTO_POR_PISTA;

    let status = "Operação estável";
    let nivelAlerta = "ok";

    if (excessoFila >= 4 || tempoEspera >= 32) {
      status = "Congestionamento crítico na malha!";
      nivelAlerta = "critico";
    } else if (excessoFila > 0 || ocupacao >= 80) {
      status = "Atenção: fila acima da capacidade ideal";
      nivelAlerta = "alerta";
    }

    return {
      capacidadeTotal,
      ocupacao,
      tempoEspera,
      lucroEstimado,
      status,
      nivelAlerta,
    };
  }, [pistas, voosFila]);

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

      <div className="simulador-metricas">
        <div className="metrica-card">
          <span className="metrica-titulo">Capacidade</span>
          <strong className="metrica-valor">{metricas.capacidadeTotal} voos</strong>
        </div>

        <div className="metrica-card">
          <span className="metrica-titulo">Ocupação</span>
          <strong className="metrica-valor">{metricas.ocupacao}%</strong>
        </div>

        <div className="metrica-card">
          <span className="metrica-titulo">Espera média</span>
          <strong className="metrica-valor">{metricas.tempoEspera} min</strong>
        </div>

        <div className="metrica-card">
          <span className="metrica-titulo">Lucro estimado</span>
          <strong className="metrica-valor">
            R$ {metricas.lucroEstimado.toLocaleString("pt-BR")}
          </strong>
        </div>
      </div>

      <div className="simulador-barra-wrap" aria-hidden="true">
        <div
          className={`simulador-barra-fill is-${metricas.nivelAlerta}`}
          style={{ width: `${metricas.ocupacao}%` }}
        />
      </div>

      <p className={`simulador-alerta is-${metricas.nivelAlerta}`} role="status">
        {metricas.status}
      </p>

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