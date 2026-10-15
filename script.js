/* ===== CONFIGURAÇÕES DA LOJA ===== */
// Número com 55 + DDD + número, só dígitos. Ex.: 5519999999999
const WHATSAPP = "5519998486853";

/* ===== CARDÁPIO =====
   Para ADICIONAR um item: copie uma linha { ... } e altere os dados.
   Para REMOVER: apague a linha inteira.
   Para deixar de vender temporariamente: coloque  ativo: false
   Para mostrar foto: cole o link da imagem em  imagem: "https://..."
   (deixe "" para não mostrar foto) */
const PRODUTOS = [
  { nome: "Coca-Cola Lata", descricao: "Normal/Zero", preco: 7.00, imagem: "", ativo: true },
  { nome: "KitKat",         descricao: "",               preco: 6.00, imagem: "https://superkan.com.br/chocolate-kit-kat-nestle-415g/7613033353321/d", ativo: true },
  { nome: "Trento Massimo", descricao: "Chocolate 25g",  preco: 4.00, imagem: "", ativo: true },
  { nome: "Ouro Branco",    descricao: "",               preco: 3.00, imagem: "", ativo: true },
];

/* ===== CÓDIGO (não precisa mexer daqui para baixo) ===== */
const brl = v => "R$ " + v.toFixed(2).replace(".", ",");
const lista = document.getElementById("cardapio");
const btnPedido = document.getElementById("btn-pedido");
const itens = PRODUTOS.filter(p => p.ativo !== false);
const qtds = itens.map(() => 0);

const link = texto => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
document.getElementById("btn-geral").href = link("Olá, OpenBox! Gostaria de fazer um pedido.");

itens.forEach((p, i) => {
  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `
    ${p.imagem ? `<img class="item-foto" src="${p.imagem}" alt="${p.nome}" loading="lazy">` : ""}
    <div class="item-texto">
      <div class="item-nome">${p.nome}</div>
      ${p.descricao ? `<div class="item-desc">${p.descricao}</div>` : ""}
      <div class="item-preco">${brl(p.preco)}</div>
    </div>
    <div class="qtd">
      <button type="button" class="menos" id="m${i}" aria-label="Remover ${p.nome}" data-i="${i}" data-d="-1">−</button>
      <output id="q${i}">0</output>
      <button type="button" class="mais" aria-label="Adicionar ${p.nome}" data-i="${i}" data-d="1">+</button>
    </div>`;
  lista.appendChild(li);
});

lista.addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  const i = +b.dataset.i;
  qtds[i] = Math.max(0, qtds[i] + +b.dataset.d);
  document.getElementById("q" + i).textContent = qtds[i];
  document.getElementById("m" + i).classList.toggle("ativo", qtds[i] > 0);
  atualizar();
});

function atualizar() {
  const escolhidos = itens.map((p, i) => ({ p, q: qtds[i] })).filter(x => x.q > 0);
  const total = escolhidos.reduce((s, x) => s + x.p.preco * x.q, 0);
  const n = escolhidos.reduce((s, x) => s + x.q, 0);
  document.getElementById("barra-qtd").textContent = n === 1 ? "1 item" : n + " itens";
  document.getElementById("barra-total").textContent = brl(total);
  btnPedido.setAttribute("aria-disabled", n ? "false" : "true");
  if (!n) { btnPedido.removeAttribute("href"); return; }
  const msg = "Olá! Quero fazer um pedido:\n\n" +
    escolhidos.map(x => `${x.q}x ${x.p.nome}${x.p.descricao ? " (" + x.p.descricao + ")" : ""} — ${brl(x.p.preco * x.q)}`).join("\n") +
    `\n\n*Total: ${brl(total)}*`;
  btnPedido.href = link(msg);
}
atualizar();
