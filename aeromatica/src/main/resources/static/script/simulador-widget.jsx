// simulador-widget.jsx: mini-simulador da home (React via Babel standalone)
(function () {
  const { useState, useMemo } = React;

  const CAPACIDADE_POR_PISTA = 3;
  const RECEITA_POR_VOO = 420;
  const CUSTO_POR_PISTA = 250;
  const TEMPO_BASE_MIN = 8;
  const MIN_PISTAS = 1, MAX_PISTAS = 6, MIN_VOOS = 0, MAX_VOOS = 20;
  const PISTAS_INICIAIS = 2, VOOS_INICIAIS = 5;

  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const limitar = (v, min, max) => Math.min(max, Math.max(min, v));

  function Controle({ rotulo, valor, min, max, onChange, nome }) {
    return (
      <div className="controle-grupo">
        <span className="controle-label">{rotulo}</span>
        <div className="controle-botoes">
          <button type="button" className="btn-ajuste" onClick={() => onChange(valor - 1)}
            disabled={valor <= min} aria-label={`Diminuir ${nome}`}>-</button>
          <strong className="controle-valor" aria-live="polite">{valor}</strong>
          <button type="button" className="btn-ajuste" onClick={() => onChange(valor + 1)}
            disabled={valor >= max} aria-label={`Aumentar ${nome}`}>+</button>
        </div>
      </div>
    );
  }

  function Metrica({ titulo, valor }) {
    return (
      <div className="metrica-card">
        <span className="metrica-titulo">{titulo}</span>
        <strong className="metrica-valor">{valor}</strong>
      </div>
    );
  }

  function SimuladorAeromatica() {
    const [pistas, setPistas] = useState(PISTAS_INICIAIS);
    const [voosFila, setVoosFila] = useState(VOOS_INICIAIS);

    const m = useMemo(() => {
      const capacidadeTotal = pistas * CAPACIDADE_POR_PISTA;
      const ocupacao = Math.min(100, Math.round((voosFila / capacidadeTotal) * 100));
      const voosAtendidos = Math.min(voosFila, capacidadeTotal);
      const excessoFila = Math.max(0, voosFila - capacidadeTotal);
      const tempoEspera = voosFila === 0 ? 0 : TEMPO_BASE_MIN + excessoFila * 6;
      const lucroEstimado = voosAtendidos * RECEITA_POR_VOO - pistas * CUSTO_POR_PISTA;

      let status = "Operação estável";
      let nivel = "ok";
      if (excessoFila >= 4) {
        status = "Congestionamento crítico na malha!";
        nivel = "critico";
      } else if (excessoFila > 0) {
        status = "Atenção: fila acima da capacidade";
        nivel = "alerta";
      } else if (ocupacao >= 80) {
        status = "Atenção: operação perto do limite";
        nivel = "alerta";
      }
      return { capacidadeTotal, ocupacao, tempoEspera, lucroEstimado, status, nivel };
    }, [pistas, voosFila]);

    const resetar = () => { setPistas(PISTAS_INICIAIS); setVoosFila(VOOS_INICIAIS); };

    return (
      <div className="simulador-box">
        <div className="simulador-controles">
          <Controle rotulo="Pistas ativas" nome="pistas" valor={pistas} min={MIN_PISTAS} max={MAX_PISTAS}
            onChange={(v) => setPistas(limitar(v, MIN_PISTAS, MAX_PISTAS))} />
          <Controle rotulo="Voos na fila" nome="voos na fila" valor={voosFila} min={MIN_VOOS} max={MAX_VOOS}
            onChange={(v) => setVoosFila(limitar(v, MIN_VOOS, MAX_VOOS))} />
        </div>

        <div className="simulador-metricas">
          <Metrica titulo="Capacidade" valor={`${m.capacidadeTotal} voos`} />
          <Metrica titulo="Ocupação" valor={`${m.ocupacao}%`} />
          <Metrica titulo="Espera média" valor={`${m.tempoEspera} min`} />
          <Metrica titulo="Lucro estimado" valor={BRL.format(m.lucroEstimado)} />
        </div>

        <div className="simulador-barra-wrap" aria-hidden="true">
          <div className={`simulador-barra-fill is-${m.nivel}`} style={{ width: `${m.ocupacao}%` }} />
        </div>

        <p className={`simulador-alerta is-${m.nivel}`} role="status">{m.status}</p>

        <div className="simulador-rodape-acoes">
          <button type="button" className="btn-sec simulador-reset" onClick={resetar}>Resetar cenário</button>
        </div>
      </div>
    );
  }

  const raiz = document.getElementById("simulador-aeromatica");
  if (raiz) ReactDOM.createRoot(raiz).render(<SimuladorAeromatica />);
})();