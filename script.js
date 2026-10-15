/* ===== CONFIGURAÇÕES DA LOJA ===== */
// Número com 55 + DDD + número, só dígitos. Ex.: 5519999999999
const WHATSAPP = "5519999999999";

/* ===== CARDÁPIO =====
   Para ADICIONAR um item: copie uma linha { ... } e altere os dados.
   Para REMOVER: apague a linha inteira.
   Para deixar de vender temporariamente: coloque  ativo: false  */
const PRODUTOS = [
  { nome: "Coca-Cola Lata", descricao: "Normal ou Zero", preco: 7.00, imagem: "img/coca.jpg",        ativo: true },
  { nome: "KitKat",         descricao: "",               preco: 6.00, imagem: "img/kitkat.jpg",      ativo: true },
  { nome: "Trento Massimo", descricao: "Chocolate 25g",  preco: 4.00, imagem: "img/trento.jpg",      ativo: true },
  { nome: "Ouro Branco",    descricao: "",               preco: 3.00, imagem: "img/ouro-branco.jpg", ativo: true },
];

/* ===== CÓDIGO (não precisa mexer daqui para baixo) ===== */
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const lista = document.getElementById("cardapio");
const barra = document.getElementById("barra-pedido");
const itens = PRODUTOS.filter(p => p.ativo !== false);
const qtds = itens.map(() => 0);

const link = texto => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
document.getElementById("btn-geral").href = link("Olá, OpenBox! Gostaria de fazer um pedido.");

itens.forEach((p, i) => {
  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `
    <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
    <div>
      <div class="item-nome">${p.nome}</div>
      ${p.descricao ? `<div class="item-desc">${p.descricao}</div>` : ""}
    </div>
    <div class="item-lado">
      <div class="preco"><small>R$</small>${p.preco.toFixed(2).replace(".", ",")}</div>
      <div class="qtd">
        <button type="button" aria-label="Remover ${p.nome}" data-i="${i}" data-d="-1">−</button>
        <output id="q${i}">0</output>
        <button type="button" aria-label="Adicionar ${p.nome}" data-i="${i}" data-d="1">+</button>
      </div>
    </div>`;
  lista.appendChild(li);
});

lista.addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  const i = +b.dataset.i;
  qtds[i] = Math.max(0, qtds[i] + +b.dataset.d);
  document.getElementById("q" + i).textContent = qtds[i];
  atualizar();
});

function atualizar() {
  const escolhidos = itens.map((p, i) => ({ p, q: qtds[i] })).filter(x => x.q > 0);
  barra.hidden = escolhidos.length === 0;
  if (!escolhidos.length) return;
  const total = escolhidos.reduce((s, x) => s + x.p.preco * x.q, 0);
  const n = escolhidos.reduce((s, x) => s + x.q, 0);
  document.getElementById("barra-qtd").textContent = n + (n > 1 ? " itens" : " item");
  document.getElementById("barra-total").textContent = brl(total);
  const msg = "Olá, OpenBox! Quero fazer um pedido:\n\n" +
    escolhidos.map(x => `${x.q}x ${x.p.nome}${x.p.descricao ? " (" + x.p.descricao + ")" : ""} - ${brl(x.p.preco * x.q)}`).join("\n") +
    `\n\nTotal: ${brl(total)}`;
  document.getElementById("btn-pedido").href = link(msg);
}
