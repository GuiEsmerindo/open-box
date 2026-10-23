/* ===== CONFIGURAÇÕES DA LOJA ===== */
// Número com 55 + DDD + número, só dígitos. Ex.: 5519999999999
const WHATSAPP = "5519998486853";
// Link do formulário de sugestões
const LINK_SUGESTAO = "https://forms.gle/1CDVpfFGvDW3VBPo7";

/* ===== CARDÁPIO =====
   Para ADICIONAR um item: copie uma linha { ... } e altere os dados.
   Para REMOVER: apague a linha inteira.
   Para deixar de vender temporariamente: coloque  ativo: false
   tipo: classificação do produto (ex.: "Bebida", "Chocolate"). Aparece no filtro e na busca.
   imagem: link da imagem ou nome do arquivo (deixe "" para não mostrar foto).
   promo: { qtd: 4, preco: 10.00 } → "leve 4 por R$ 10,00"  (sem promoção: null)
   sabores: lista de sabores. Se o produto tiver, o botão "+ Sabores" abre a escolha.
            Para produto sem sabores, apague o campo ou deixe  sabores: []
            Para tirar um sabor de vez, apague o nome dele da lista.
   ESGOTADO: coloque  esgotado: true  no produto para marcá-lo como esgotado.
            Para um sabor esgotado, troque "Mango Loco" por { nome: "Mango Loco", esgotado: true }
            Se todos os sabores estiverem esgotados, o produto inteiro aparece como esgotado.
            Quando chegar de novo, volte para  esgotado: false  (ou apague o campo). */
const PRODUTOS = [
  { nome: "Água C/ Gás", descricao: "510ml", tipo: "Bebida", preco: 3.79, imagem: "https://apoioentrega.vteximg.com.br/arquivos/ids/1911515/139272_0.png", promo: null, ativo: true },
  { nome: "Red Bull", descricao: "250ml", sabores: ["Tradicional", "Tradicional Zero"], tipo: "Bebida", preco: 12.00, imagem: "https://nossadistribuidorabebidas.com.br/wp-content/uploads/2021/12/red-bull-250ml.png", promo: null, ativo: true },
  { nome: "Monster", descricao: "437ml", sabores: ["Tradicional Zero", "Mango Loco", "Pipeline Punch"], tipo: "Bebida", preco: 12.00, imagem: "https://edge.osuper.com.br/JHFyjJ5KBpc6R5LjJHbUEJzGLp4=/1600x0/smart/https://osuper-ecommerce-koch.s3.sa-east-1.amazonaws.com/e50785a3-EnergticoMonsterUltraSemAcar473Ml_75539.png", promo: null, ativo: true },
  { nome: "Coca-Cola Lata", descricao: "350ml", sabores: ["Normal", "Zero"], tipo: "Bebida", preco: 7.00, imagem: "https://pipocao.agilecdn.com.br/13208.jpg", promo: null, ativo: true },
  { nome: "Coca-Cola 2lts", descricao: "", tipo: "Bebida", preco: 14.50, imagem: "https://phygital-files.mercafacil.com/princesa/uploads/produto/refrigerante_original_coca_cola_pet_2500ml_59fe5b72-9150-414f-adfc-8a3c2c440f14.png", promo: null, ativo: true },
  { nome: "Amendoim Mendorato", descricao: "44g", tipo: "Salgadinho", preco: 2.50, imagem: "https://phygital-files.mercafacil.com/catalogo/uploads/produto/amendoim_japones_mendorato_45g_91920d3c-1fb4-43fa-87e3-a457e8504c0c.png", promo: null, ativo: true },
  { nome: "KitKat", descricao: "", tipo: "Chocolate", preco: 6.00, imagem: "https://assets.ibecom.com.br/ib.item.image.large/l-d2e29f027e724f08b63e2bb553cf7f0e.png", promo: { qtd: 2, preco: 10.00 }, ativo: true },
  { nome: "Trento Massimo Choc/ 25g", descricao: "", tipo: "Chocolate", preco: 4.00, imagem: "https://d16w7cuzwgzfcy.cloudfront.net/Custom/Content/Products/19/12/191296_chocolate-trento-massimo-chocolate-30gr-p565181_m2_638963831166557784.webp", promo: null, ativo: true },
  { nome: "Ouro Branco", descricao: "", tipo: "Chocolate", preco: 3.00, imagem: "https://assets.jokrtech.com/small_PROD_150802003_P1_28e61fdaa9.png", promo: { qtd: 4, preco: 10.00 }, ativo: true },
];

/* ===== CÓDIGO (não precisa mexer daqui para baixo) ===== */
const brl = v => "R$ " + v.toFixed(2).replace(".", ",");
const $ = id => document.getElementById(id);
const lista = $("cardapio");
const btnPedido = $("btn-pedido");
const itens = PRODUTOS.filter(p => p.ativo !== false).map(p => {
  const sabores = (p.sabores || []).map(s => typeof s === "string" ? { nome: s } : s);
  const esgotado = p.esgotado === true || (sabores.length > 0 && sabores.every(s => s.esgotado === true));
  return { ...p, sabores, esgotado };
});
const disponiveis = p => p.sabores.filter(s => !s.esgotado).length;
const temSabores = p => Array.isArray(p.sabores) && p.sabores.length > 0;
const qtds = itens.map(() => 0);                                   // total por produto
const sab = itens.map(p => temSabores(p) ? p.sabores.map(() => 0) : null); // por sabor
const lis = [];

const link = texto => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
$("btn-geral").href = link("Olá, OpenBox! Gostaria de fazer um pedido.");
$("btn-sugestao").href = LINK_SUGESTAO;

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

const resumoSabores = i => itens[i].sabores.map((s, k) => sab[i][k] ? `${sab[i][k]}x ${s.nome}` : null).filter(Boolean);

itens.forEach((p, i) => {
  const li = document.createElement("li");
  li.className = "item" + (p.esgotado ? " esgotado" : "");
  const controle = p.esgotado
    ? `<span class="tag-esgotado">Esgotado</span>`
    : temSabores(p)
    ? `<button type="button" class="btn-sabores" id="s${i}" data-abrir="${i}" aria-label="Escolher sabores de ${p.nome}">+ Sabores</button>`
    : `<div class="qtd">
         <button type="button" class="menos" id="m${i}" aria-label="Remover ${p.nome}" data-i="${i}" data-d="-1">−</button>
         <output id="q${i}">0</output>
         <button type="button" class="mais" aria-label="Adicionar ${p.nome}" data-i="${i}" data-d="1">+</button>
       </div>`;
  li.innerHTML = `
    ${p.imagem ? `<img class="item-foto" src="${p.imagem}" alt="${p.nome}" loading="lazy">` : ""}
    <div class="item-texto">
      <div class="item-nome">${p.nome}</div>
      ${p.descricao ? `<div class="item-desc">${p.descricao}</div>` : ""}
      <div class="item-preco">${brl(p.preco)}</div>
      ${temSabores(p) && !p.esgotado ? `<button type="button" class="item-sabores" id="l${i}" data-abrir="${i}">Ver sabores (${disponiveis(p)})</button>` : ""}
      ${p.promo && !p.esgotado ? `<div class="item-promo" id="p${i}">${textoPromo(p, 0).texto}</div>` : ""}
    </div>
    ${controle}`;
  lista.appendChild(li);
  lis.push(li);
});

// Atualiza a linha do produto depois de qualquer mudança de quantidade
function refresh(i) {
  const p = itens[i], q = qtds[i];
  if (temSabores(p)) {
    const b = $("s" + i), l = $("l" + i), r = resumoSabores(i);
    b.innerHTML = q ? `<span class="bolha">${q}</span> Editar` : "+ Sabores";
    b.classList.toggle("tem", q > 0);
    l.textContent = r.length ? r.join(" · ") : `Ver sabores (${disponiveis(p)})`;
    l.classList.toggle("escolhido", r.length > 0);
  } else {
    $("q" + i).textContent = q;
    $("m" + i).classList.toggle("ativo", q > 0);
  }
  if (p.promo) {
    const t = textoPromo(p, q), el = $("p" + i);
    el.textContent = t.texto;
    el.classList.toggle("ativa", t.ativa);
  }
  atualizar();
}

// Produtos sem sabor: botões − e +
lista.addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (b) {
    const i = +b.dataset.i;
    qtds[i] = Math.max(0, qtds[i] + +b.dataset.d);
    refresh(i);
    return;
  }
  const a = e.target.closest("[data-abrir]");
  if (a) abrirFolha(+a.dataset.abrir, a);
});

/* ===== JANELA DE SABORES ===== */
const folha = $("folha"), folhaLista = $("folha-lista"), folhaPromo = $("folha-promo");
let atual = null, foco = null;

function abrirFolha(i, origem) {
  atual = i; foco = origem;
  const p = itens[i];
  $("folha-titulo").textContent = p.nome;
  $("folha-sub").textContent = [p.descricao, brl(p.preco)].filter(Boolean).join(" · ");
  folhaLista.innerHTML = p.sabores.map((s, k) => s.esgotado ? `
    <li class="sabor-esgotado"><span>${s.nome}</span><span class="tag-esgotado">Esgotado</span></li>` : `
    <li><span>${s.nome}</span>
      <div class="qtd">
        <button type="button" class="menos${sab[i][k] ? " ativo" : ""}" id="fm${k}" aria-label="Remover ${s.nome}" data-f="${k}" data-d="-1">−</button>
        <output id="fq${k}">${sab[i][k]}</output>
        <button type="button" class="mais" aria-label="Adicionar ${s.nome}" data-f="${k}" data-d="1">+</button>
      </div>
    </li>`).join("");
  atualizarPromoFolha();
  folha.hidden = false;
  document.body.style.overflow = "hidden";
  folhaLista.querySelector(".mais").focus();
}

function fecharFolha() {
  folha.hidden = true;
  document.body.style.overflow = "";
  if (foco) foco.focus();
  atual = null;
}

function atualizarPromoFolha() {
  const p = itens[atual];
  folhaPromo.hidden = !p.promo;
  if (!p.promo) return;
  const t = textoPromo(p, qtds[atual]);
  folhaPromo.textContent = t.texto;
  folhaPromo.classList.toggle("ativa", t.ativa);
}

folhaLista.addEventListener("click", e => {
  const b = e.target.closest("button[data-f]");
  if (!b || atual === null) return;
  const k = +b.dataset.f;
  sab[atual][k] = Math.max(0, sab[atual][k] + +b.dataset.d);
  qtds[atual] = sab[atual].reduce((s, n) => s + n, 0);
  $("fq" + k).textContent = sab[atual][k];
  $("fm" + k).classList.toggle("ativo", sab[atual][k] > 0);
  atualizarPromoFolha();
  refresh(atual);
});
folha.addEventListener("click", e => { if (e.target.closest("[data-fechar]")) fecharFolha(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !folha.hidden) fecharFolha(); });

/* ===== PEDIDO ===== */
function atualizar() {
  const escolhidos = itens.map((p, i) => ({ p, i, q: qtds[i] })).filter(x => x.q > 0);
  const total = escolhidos.reduce((s, x) => s + totalItem(x.p, x.q), 0);
  const cheio = escolhidos.reduce((s, x) => s + x.p.preco * x.q, 0);
  const n = escolhidos.reduce((s, x) => s + x.q, 0);
  $("barra-qtd").textContent = n === 1 ? "1 item" : n + " itens";
  $("barra-total").textContent = brl(total);
  btnPedido.setAttribute("aria-disabled", n ? "false" : "true");
  if (!n) { btnPedido.removeAttribute("href"); return; }
  const linhas = escolhidos.map(x => {
    const promo = x.p.promo && x.q >= x.p.promo.qtd ? " (promoção)" : "";
    const desc = x.p.descricao ? " (" + x.p.descricao + ")" : "";
    const sub = temSabores(x.p) ? resumoSabores(x.i).map(s => `\n   • ${s}`).join("") : "";
    return `${x.q}x ${x.p.nome}${desc} — ${brl(totalItem(x.p, x.q))}${promo}${sub}`;
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
  const alvo = norm([p.nome, p.descricao, p.tipo, ...p.sabores.map(s => s.nome)].join(" "));
  return norm(f.texto).split(/\s+/).filter(Boolean).every(w => alvo.includes(w));
}

const painel = $("painel-filtro"), btnFiltro = $("btn-filtro"), badge = $("filtro-badge");
const chipsTipo = $("chips-tipo"), campoPreco = $("preco-max"), chkPromo = $("so-promo");

function aplicarFiltros() {
  let visiveis = 0;
  itens.forEach((p, i) => {
    const ok = passa(p, filtro);
    lis[i].hidden = !ok;
    if (ok) visiveis++;
  });
  $("vazio").hidden = visiveis > 0;
  const ativos = (filtro.tipo ? 1 : 0) + (filtro.precoMax !== null ? 1 : 0) + (filtro.soPromo ? 1 : 0);
  badge.textContent = ativos;
  badge.hidden = ativos === 0;
}

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

$("busca").addEventListener("input", e => { filtro.texto = e.target.value; aplicarFiltros(); });

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

$("limpar").addEventListener("click", () => {
  filtro.tipo = ""; filtro.precoMax = null; filtro.soPromo = false;
  campoPreco.value = ""; chkPromo.checked = false;
  chipsTipo.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.tipo === "" ? "true" : "false"));
  aplicarFiltros();
});

atualizar();
aplicarFiltros();
