(function () {
  const numero = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
  const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const n = (v) => numero.format(v);

  const FORMULAS = {
    aluguel: ({ m, v, fp, na }) => ({
      passos: [`P = ${n(m)} × ${n(v)} × ${n(fp)} × ${n(na)}`],
      resultado: m * v * fp * na,
      rotulo: "Aluguel mensal (P)",
    }),
    passagem: ({ s, c, pc, m, nq, np }) => {
      const combustivel = s * c * pc;
      const manutencao = m * nq;
      const total = combustivel + manutencao;
      return {
        passos: [
          `P = (${n(s)} × ${n(c)} × ${n(pc)} + ${n(m)} × ${n(nq)}) ÷ ${n(np)}`,
          `P = (${n(combustivel)} + ${n(manutencao)}) ÷ ${n(np)}`,
          `P = ${n(total)} ÷ ${n(np)}`,
        ],
        resultado: total / np,
        rotulo: "Preço da passagem (P)",
      };
    },
    aeronave: ({ cp, t, vm, b }) => ({
      passos: [
        `P = ${n(cp)} × ${n(t)} + ${n(vm)} × 1.000 + ${n(b)}`,
        `P = ${n(cp * t)} + ${n(vm * 1000)} + ${n(b)}`,
      ],
      resultado: cp * t + vm * 1000 + b,
      rotulo: "Preço da aeronave (P)",
    }),
    pista: ({ c, l, m }) => ({
      passos: [`Área = ${n(c)} × ${n(l)} = ${n(c * l)} m²`, `P = ${n(c * l)} × ${n(m)}`],
      resultado: c * l * m,
      rotulo: "Preço da pista (P)",
    }),
  };

  const limites = (input) => [
    input.min !== "" ? Number(input.min) : -Infinity,
    input.max !== "" ? Number(input.max) : Infinity,
  ];

  function atualizarBotoes(form) {
    form.querySelectorAll(".calc-campo").forEach((campo) => {
      const input = campo.querySelector("input");
      const [min, max] = limites(input);
      const v = input.valueAsNumber;
      campo.querySelector('[data-delta="-1"]').disabled = Number.isFinite(v) && v <= min;
      campo.querySelector('[data-delta="1"]').disabled = Number.isFinite(v) && v >= max;
    });
  }

  function ajustar(botao) {
    const input = botao.closest(".calc-campo").querySelector("input");
    const passo = Number(input.dataset.passo) || 1;
    const [min, max] = limites(input);
    const atual = Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : 0;
    const novo = Math.round((atual + Number(botao.dataset.delta) * passo) * 1e6) / 1e6; 
    input.value = Math.min(max, Math.max(min, novo));
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function atualizar(form) {
    const calcular = FORMULAS[form.dataset.formula];
    const passosEl = form.querySelector(".calc-passos");
    const resultadoEl = form.querySelector(".calc-resultado");
    if (!calcular || !passosEl || !resultadoEl) return;

    atualizarBotoes(form);

    passosEl.replaceChildren();
    resultadoEl.classList.remove("is-erro");

    let valido = true;
    const valores = {};
    form.querySelectorAll("input").forEach((input) => {
      const ok = input.checkValidity();
      input.setAttribute("aria-invalid", String(!ok));
      if (!ok) valido = false;
      valores[input.name] = input.valueAsNumber;
    });

    if (!valido) {
      resultadoEl.classList.add("is-erro");
      resultadoEl.textContent = "Preencha todos os campos com valores válidos (sem negativos).";
      return;
    }

    const { passos, resultado, rotulo } = calcular(valores);
    passos.forEach((texto) => {
      const linha = document.createElement("p");
      linha.textContent = texto;
      passosEl.append(linha);
    });
    resultadoEl.textContent = `${rotulo}: ${moeda.format(resultado)}`;
  }

  document.querySelectorAll(".calculadora").forEach((form) => {
    form.addEventListener("click", (e) => { const b = e.target.closest(".calc-btn"); if (b) ajustar(b); });
    form.addEventListener("input", () => atualizar(form));
    form.addEventListener("reset", () => setTimeout(() => atualizar(form), 0)); 
    form.addEventListener("submit", (e) => e.preventDefault());
    atualizar(form);
  });
})();