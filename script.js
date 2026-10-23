/* ===== CONFIGURAÇÕES DA LOJA ===== */
// Número com 55 + DDD + número, só dígitos. Ex.: 5519999999999
const WHATSAPP = "5519998486853";
// Link do formulário de sugestões
const LINK_SUGESTAO = "https://forms.gle/1CDVpfFGvDW3VBPo7";

/* ===== CARDÁPIO =====
   Para ADICIONAR um item: copie uma linha { ... } e altere os dados.
   Para REMOVER: apague a linha inteira.
   Para deixar de vender temporariamente: coloque  ativo: false
   tipo: classificação do produto (ex.: "Bebida", "Chocolate", "Salgado").
         Ela aparece no filtro e também entra na busca.
   imagem: link da imagem ou nome do arquivo (deixe "" para não mostrar foto).
   promo: { qtd: 4, preco: 10.00 } → "leve 4 por R$ 10,00"  (sem promoção: null)
          A promoção vale a cada grupo completo: 8 unidades = 2 grupos de 4. */
const PRODUTOS = [
  { nome: "Água C/ Gás", descricao: "510ml", tipo: "Bebida", preco: 3.79, imagem: "https://apoioentrega.vteximg.com.br/arquivos/ids/1911515/139272_0.png", promo: null, ativo: true },
  { nome: "Red Bull", descricao: "Tradicional/Tradicional Zero 250ml", tipo: "Bebida", preco: 12.00, imagem: "https://nossadistribuidorabebidas.com.br/wp-content/uploads/2021/12/red-bull-250ml.png", promo: null, ativo: true },
  { nome: "Monster", descricao: "Tradicional Zero/Mango Loco/Pipeline Punch 437ml", tipo: "Bebida", preco: 12.00, imagem: "https://edge.osuper.com.br/JHFyjJ5KBpc6R5LjJHbUEJzGLp4=/1600x0/smart/https://osuper-ecommerce-koch.s3.sa-east-1.amazonaws.com/e50785a3-EnergticoMonsterUltraSemAcar473Ml_75539.png", promo: null, ativo: true },
  { nome: "Coca-Cola Lata", descricao: "Normal/Zero - 350ml", tipo: "Bebida", preco: 7.00, imagem: "https://pipocao.agilecdn.com.br/13208.jpg", promo: null, ativo: true },
  { nome: "Coca-Cola 2lts", descricao: "", tipo: "Bebida", preco: 14.50, imagem: "https://phygital-files.mercafacil.com/princesa/uploads/produto/refrigerante_original_coca_cola_pet_2500ml_59fe5b72-9150-414f-adfc-8a3c2c440f14.png", promo: null, ativo: true },
  { nome: "Amendoim Mendorato", descricao: "44g", tipo: "Salgadinho", preco: 2.50, imagem: "https://phygital-files.mercafacil.com/catalogo/uploads/produto/amendoim_japones_mendorato_45g_91920d3c-1fb4-43fa-87e3-a457e8504c0c.png", promo: null, ativo: true },
  { nome: "KitKat", descricao: "", tipo: "Chocolate", preco: 6.00, imagem: "https://assets.ibecom.com.br/ib.item.image.large/l-d2e29f027e724f08b63e2bb553cf7f0e.png", promo: { qtd: 2, preco: 10.00 }, ativo: true },
  { nome: "Trento Massimo Choc/ 25g", descricao: "", tipo: "Chocolate", preco: 4.00, imagem: "https://d16w7cuzwgzfcy.cloudfront.net/Custom/Content/Products/19/12/191296_chocolate-trento-massimo-chocolate-30gr-p565181_m2_638963831166557784.webp", promo: null, ativo: true },
  { nome: "Ouro Branco", descricao: "", tipo: "Chocolate", preco: 3.00, imagem: "https://assets.jokrtech.com/small_PROD_150802003_P1_28e61fdaa9.png", promo: { qtd: 4, preco: 10.00 }, ativo: true },
];

/* ===== CÓDIGO (não precisa mexer daqui para baixo) ===== */
const brl = v => "R$ " + v.toFixed(2).replace(".", ",");
const lista = document.getElementById("cardapio");
const btnPedido = document.getElementById("btn-pedido");
const itens = PRODUTOS.filter(p => p.ativo !== false);
const qtds = itens.map(() => 0);
const lis = [];

const link = texto => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
document.getElementById("btn-geral").href = link("Olá, OpenBox! Gostaria de fazer um pedido.");
document.getElementById("btn-sugestao").href = LINK_SUGESTAO;

// Preço de q unidades, aplicando a promoção quando houver
function totalItem(p, q) {
  const normal = q * p.preco;
  if (!p.promo || q < p.promo.qtd) return normal;
  const grupos = Math.floor(q / p.promo.qtd);
  const resto = q % p.promo.qtd;
  return Math.min(normal, grupos * p.promo.preco + resto * p.preco);
}

function textoPromo(p, q) {
  const { qtd, preco } = p.promo;
  const economia = qtd * p.preco - preco;
  if (q >= qtd) {
    const eco = q * p.preco - totalItem(p, q);
    return { texto: `Promoção aplicada! Você economiza ${brl(eco)}`, ativa: true };
  }
  if (q > 0) return { texto: `Leve mais ${qtd - q} e pague ${brl(preco)} nos ${qtd}`, ativa: false };
  return { texto: `Leve ${qtd} por ${brl(preco)}` + (economia > 0 ? ` (economize ${brl(economia)})` : ""), ativa: false };
}

itens.forEach((p, i) => {
  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `
    ${p.imagem ? `<img class="item-foto" src="${p.imagem}" alt="${p.nome}" loading="lazy">` : ""}
    <div class="item-texto">
      <div class="item-nome">${p.nome}</div>
      ${p.descricao ? `<div class="item-desc">${p.descricao}</div>` : ""}
      <div class="item-preco">${brl(p.preco)}</div>
      ${p.promo ? `<div class="item-promo" id="p${i}">${textoPromo(p, 0).texto}</div>` : ""}
    </div>
    <div class="qtd">
      <button type="button" class="menos" id="m${i}" aria-label="Remover ${p.nome}" data-i="${i}" data-d="-1">−</button>
      <output id="q${i}">0</output>
      <button type="button" class="mais" aria-label="Adicionar ${p.nome}" data-i="${i}" data-d="1">+</button>
    </div>`;
  lista.appendChild(li);
  lis.push(li);
});

lista.addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  const i = +b.dataset.i;
  qtds[i] = Math.max(0, qtds[i] + +b.dataset.d);
  document.getElementById("q" + i).textContent = qtds[i];
  document.getElementById("m" + i).classList.toggle("ativo", qtds[i] > 0);
  if (itens[i].promo) {
    const t = textoPromo(itens[i], qtds[i]);
    const el = document.getElementById("p" + i);
    el.textContent = t.texto;
    el.classList.toggle("ativa", t.ativa);
  }
  atualizar();
});

function atualizar() {
  const escolhidos = itens.map((p, i) => ({ p, q: qtds[i] })).filter(x => x.q > 0);
  const total = escolhidos.reduce((s, x) => s + totalItem(x.p, x.q), 0);
  const cheio = escolhidos.reduce((s, x) => s + x.p.preco * x.q, 0);
  const n = escolhidos.reduce((s, x) => s + x.q, 0);
  document.getElementById("barra-qtd").textContent = n === 1 ? "1 item" : n + " itens";
  document.getElementById("barra-total").textContent = brl(total);
  btnPedido.setAttribute("aria-disabled", n ? "false" : "true");
  if (!n) { btnPedido.removeAttribute("href"); return; }
  const linhas = escolhidos.map(x => {
    const promo = x.p.promo && x.q >= x.p.promo.qtd ? " (promoção)" : "";
    return `${x.q}x ${x.p.nome}${x.p.descricao ? " (" + x.p.descricao + ")" : ""} — ${brl(totalItem(x.p, x.q))}${promo}`;
  });
  const economia = cheio - total;
  const msg = "Olá! Quero fazer um pedido:\n\n" + linhas.join("\n") +
    (economia > 0 ? `\n\nEconomia em promoções: ${brl(economia)}` : "") +
    `\n\n*Total: ${brl(total)}*`;
  btnPedido.href = link(msg);
}

/* ===== BUSCA E FILTROS ===== */
const norm = s => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const filtro = { texto: "", tipo: "", precoMax: null, soPromo: false };

function passa(p, f) {
  if (f.tipo && p.tipo !== f.tipo) return false;
  if (f.precoMax !== null && p.preco > f.precoMax) return false;
  if (f.soPromo && !p.promo) return false;
  const alvo = norm([p.nome, p.descricao, p.tipo].join(" "));
  return norm(f.texto).split(/\s+/).filter(Boolean).every(w => alvo.includes(w));
}

const painel = document.getElementById("painel-filtro");
const btnFiltro = document.getElementById("btn-filtro");
const badge = document.getElementById("filtro-badge");
const chipsTipo = document.getElementById("chips-tipo");
const campoPreco = document.getElementById("preco-max");
const chkPromo = document.getElementById("so-promo");

function aplicarFiltros() {
  let visiveis = 0;
  itens.forEach((p, i) => {
    const ok = passa(p, filtro);
    lis[i].hidden = !ok;
    if (ok) visiveis++;
  });
  document.getElementById("vazio").hidden = visiveis > 0;
  const ativos = (filtro.tipo ? 1 : 0) + (filtro.precoMax !== null ? 1 : 0) + (filtro.soPromo ? 1 : 0);
  badge.textContent = ativos;
  badge.hidden = ativos === 0;
}

// Chips de tipo, criados a partir dos produtos
const tipos = [...new Set(itens.map(p => p.tipo).filter(Boolean))];
["", ...tipos].forEach(t => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.dataset.tipo = t;
  b.textContent = t || "Todos";
  b.setAttribute("aria-pressed", t === "" ? "true" : "false");
  chipsTipo.appendChild(b);
});

chipsTipo.addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  filtro.tipo = b.dataset.tipo;
  chipsTipo.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b ? "true" : "false"));
  aplicarFiltros();
});

document.getElementById("busca").addEventListener("input", e => { filtro.texto = e.target.value; aplicarFiltros(); });

campoPreco.addEventListener("input", () => {
  const v = parseFloat(campoPreco.value.replace(",", "."));
  filtro.precoMax = isNaN(v) ? null : v;
  aplicarFiltros();
});

chkPromo.addEventListener("change", () => { filtro.soPromo = chkPromo.checked; aplicarFiltros(); });

btnFiltro.addEventListener("click", () => {
  painel.hidden = !painel.hidden;
  btnFiltro.setAttribute("aria-expanded", String(!painel.hidden));
});

document.getElementById("limpar").addEventListener("click", () => {
  filtro.tipo = ""; filtro.precoMax = null; filtro.soPromo = false;
  campoPreco.value = ""; chkPromo.checked = false;
  chipsTipo.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.tipo === "" ? "true" : "false"));
  aplicarFiltros();
});

atualizar();
aplicarFiltros();
