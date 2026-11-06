/* ===== CONFIGURAÇÕES DA LOJA ===== */
// Número com 55 + DDD + número, só dígitos. Ex.: 5519999999999
const WHATSAPP = "5519990239880";
// Link do formulário de sugestões
const LINK_SUGESTAO = "https://forms.gle/1CDVpfFGvDW3VBPo7";

/* ===== CARDÁPIO =====
   Para ADICIONAR um item: copie uma linha { ... } e altere os dados.
   Para REMOVER: apague a linha inteira.  Para esconder por um tempo: ativo: false
   tipo: vira o subtítulo da seção, o botão do filtro e vale na busca.
   imagem: link da imagem ou nome do arquivo (deixe "" para não mostrar foto).
   sabores: lista de sabores (veja "Ver sabores"). Sabor esgotado: { nome: "Mango Loco", esgotado: true }
   esgotado: true → marca o produto inteiro como esgotado.

   PROMOÇÃO "LEVE X POR Y":   promo: { qtd: 4, preco: 10.00 }     (sem promoção: null)
   OFERTA "DE / POR":         oferta: { preco: 5.90 }
        O "preco" do produto continua sendo o preço normal. Quando a oferta está valendo, a página
        mostra "De R$ normal / Por R$ oferta" e cobra o preço da oferta.
   Tanto promo quanto oferta aceitam, se quiser que valham só em certos momentos:
        dias: [3, 5]            → só nesses dias (0=dom 1=seg 2=ter 3=qua 4=qui 5=sex 6=sáb)
        de: "2026-11-10"        → a partir dessa data
        ate: "2026-11-30"       → até essa data (inclusive)
   Exemplo: oferta: { preco: 5.90, dias: [3] }  → "De R$ 7,00 por R$ 5,90" só às quartas. */
const PRODUTOS = [
  { nome: "Água C/ Gás", descricao: "510ml", esgotado: true, tipo: "Bebidas", preco: 3.80, imagem: "https://apoioentrega.vteximg.com.br/arquivos/ids/1911515/139272_0.png", promo: null, ativo: false },
  { nome: "Red Bull", descricao: "250ml", sabores: ["Tradicional", "Tradicional Zero"], tipo: "Bebidas", preco: 12.00, imagem: "https://nossadistribuidorabebidas.com.br/wp-content/uploads/2021/12/red-bull-250ml.png", promo: null, ativo: true },
  { nome: "Monster", descricao: "437ml", sabores: ["Tradicional Zero","Mango Loco", "Pipeline Punch"], tipo: "Bebidas", preco: 12.00, imagem: "https://edge.osuper.com.br/JHFyjJ5KBpc6R5LjJHbUEJzGLp4=/1600x0/smart/https://osuper-ecommerce-koch.s3.sa-east-1.amazonaws.com/e50785a3-EnergticoMonsterUltraSemAcar473Ml_75539.png", promo: null, ativo: true },
  { nome: "Coca-Cola Mini", descricao: "200ml", sabores: ["Normal", "Zero"], tipo: "Bebidas", preco: 3.50, imagem: "https://coopsp.vtexassets.com/arquivos/ids/249034/56298.png", promo: null, ativo: true },
  { nome: "Coca-Cola Lata", descricao: "350ml", sabores: ["Normal", "Zero"], tipo: "Bebidas", preco: 7.00, imagem: "https://pipocao.agilecdn.com.br/13208.jpg", promo: null, ativo: true },
  { nome: "Esportivo 2 Lts", descricao: "", sabores: ["Guaraná"], tipo: "Bebidas", preco: 7.80, imagem: "https://refrigerantesesportivo.com.br/wp-content/uploads/2026/06/2-esportivo-carrossel-Guarana-2L.webp", promo: null, ativo: true },
  { nome: "Coca-Cola 2 Lts", descricao: "", tipo: "Bebidas", preco: 14.80, imagem: "https://phygital-files.mercafacil.com/princesa/uploads/produto/refrigerante_original_coca_cola_pet_2500ml_59fe5b72-9150-414f-adfc-8a3c2c440f14.png", promo: null, ativo: true },
  { nome: "Amendoim Mendorato", descricao: "24g", tipo: "Salgadinhos", preco: 2.50, imagem: "https://phygital-files.mercafacil.com/catalogo/uploads/produto/amendoim_japones_mendorato_45g_91920d3c-1fb4-43fa-87e3-a457e8504c0c.png", promo: null, ativo: true },
  { nome: "Doritos", descricao: "120g", tipo: "Salgadinhos", preco: 14.90, imagem: "https://images.tcdn.com.br/img/img_prod/1176430/salgadinho_doritos_queijo_nacho_120g_18849_1_37da41f31446d05e392f9f74a3fd4f1d.png", promo: null, ativo: true },
  { nome: "Batata Lays", descricao: "62g", sabores: [{nome: "Clássica", esgotado: true }, "Sour Cream"], tipo: "Salgadinhos", preco: 13.80, imagem: "https://hiperideal.vtexassets.com/arquivos/ids/235268/2204200.png", promo: null, ativo: true },
  { nome: "Torcida", descricao: "60g", sabores: ["Churrasco", {nome: "Queijo", esgotado: true}], tipo: "Salgadinhos", preco: 4.30, imagem: "https://gddistribuidor.agilecdn.com.br/5904.png", promo: null, ativo: true },
  { nome: "KitKat", descricao: "", tipo: "Chocolates", preco: 6.00, imagem: "https://assets.ibecom.com.br/ib.item.image.large/l-d2e29f027e724f08b63e2bb553cf7f0e.png", promo: { qtd: 2, preco: 10.00 }, ativo: true },
  { nome: "Trento", sabores: ["Massimo Chocolate 25g", "Chocolate 29g", "Duo 29g (Chocolate Branco e ao Leite)"], descricao: "", tipo: "Chocolates", preco: 4.00, imagem: "https://phygital-files.mercafacil.com/catalogo/uploads/produto/wafer_recheio_chocolate_cobertura_chocolate_ao_leite_trento_pacote_32g_3e32eaa4-abe7-41c1-b3b1-8b01c35f4108.png", promo: null, ativo: true },
  { nome: "Ouro Branco", descricao: "", tipo: "Chocolates", preco: 3.00, imagem: "https://assets.jokrtech.com/small_PROD_150802003_P1_28e61fdaa9.png", promo: { qtd: 4, preco: 10.00 }, ativo: true },
];

/* ===== AVISOS (POP-UP) =====
   Aparecem quando o cliente abre a página. Cada aviso aparece 1 vez por dia para cada cliente
   (para aparecer sempre, coloque  sempre: true).  Vários avisos válidos aparecem um depois do outro.
   id:        nome único do aviso. Se você mudar o id, ele volta a aparecer para quem já viu.
   ativo:     true liga, false desliga.
   dias / de / ate: quando vale (igual às ofertas). Apague para valer sempre.
   titulo, texto: o texto aceita quebra de linha com \n.
   imagem:    opcional. Link ou nome do arquivo enviado ao GitHub (ex.: "promo-quarta.jpg").
   botao:     texto do botão (padrão: "Ver cardápio").
   soPromocoes: true → o botão já mostra só os produtos em promoção.
   buscar:    "Monster" → o botão já pesquisa por esse nome (bom para anunciar produto novo).
   TESTE: abra o site com  ?dia=3  no final do link para simular uma quarta-feira (0 a 6),
          e com  &aviso  para ignorar o "já vi hoje". Ex.: seusite.github.io/open-box/?dia=3&aviso */
const AVISOS = [
  {
    id: "exemplo-quarta",
    ativo: false,
    dias: [4],
    titulo: "Quarta do Chocolate",
    texto: "Hoje o KitKat e o Ouro Branco estão em promoção.\nAproveite!",
    imagem: "",
    botao: "Ver promoções",
    soPromocoes: true,
  },
];

/* ===== CÓDIGO (não precisa mexer daqui para baixo) ===== */
const brl = v => "R$ " + v.toFixed(2).replace(".", ",");
const $ = id => document.getElementById(id);
const lista = $("cardapio");
const btnPedido = $("btn-pedido");

// Data e dia da semana de hoje (?dia=3 na URL simula um dia, só para testes)
const params = new URLSearchParams(location.search);
const agora = new Date();
const dataHoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;
const diaHoje = params.has("dia") && params.get("dia") !== "" ? +params.get("dia") : agora.getDay();
// Vale hoje? (dias, de e ate são opcionais)
const vigente = o => {
  if (!o) return false;
  if (Array.isArray(o.dias) && o.dias.length && !o.dias.includes(diaHoje)) return false;
  if (o.de && dataHoje < o.de) return false;
  if (o.ate && dataHoje > o.ate) return false;
  return true;
};

const itens = PRODUTOS.filter(p => p.ativo !== false).map(p => {
  const sabores = (p.sabores || []).map(s => typeof s === "string" ? { nome: s } : s);
  const esgotado = p.esgotado === true || (sabores.length > 0 && sabores.every(s => s.esgotado === true));
  const promo = vigente(p.promo) ? p.promo : null;
  const ofertaOn = vigente(p.oferta) && p.oferta.preco < p.preco;
  return { ...p, sabores, esgotado, promo, preco: ofertaOn ? p.oferta.preco : p.preco, precoDe: ofertaOn ? p.preco : null };
});
const disponiveis = p => p.sabores.filter(s => !s.esgotado).length;

// Agrupa por tipo (cada seção na ordem em que o tipo aparece primeiro)
const nomeTipo = p => p.tipo || "Outros";
const ordemTipos = [...new Set(itens.map(nomeTipo))];
itens.sort((a, b) => ordemTipos.indexOf(nomeTipo(a)) - ordemTipos.indexOf(nomeTipo(b)));
const secoes = [];
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

const precoHtml = p => p.precoDe
  ? `<div class="item-de">De ${brl(p.precoDe)}</div><div class="item-preco">Por ${brl(p.preco)}</div>`
  : `<div class="item-preco">${brl(p.preco)}</div>`;

const resumoSabores = i => itens[i].sabores.map((s, k) => sab[i][k] ? `${sab[i][k]}x ${s.nome}` : null).filter(Boolean);

itens.forEach((p, i) => {
  if (i === 0 || nomeTipo(p) !== nomeTipo(itens[i - 1])) {
    const h = document.createElement("li");
    h.className = "secao";
    h.innerHTML = `<h2>${nomeTipo(p)}</h2>`;
    lista.appendChild(h);
    secoes.push({ el: h, idx: [] });
  }
  secoes[secoes.length - 1].idx.push(i);
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
      ${precoHtml(p)}
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
  $("folha-sub").textContent = [p.descricao, p.precoDe ? `de ${brl(p.precoDe)} por ${brl(p.preco)}` : brl(p.preco)].filter(Boolean).join(" · ");
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
  const cheio = escolhidos.reduce((s, x) => s + (x.p.precoDe || x.p.preco) * x.q, 0);
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
  if (f.soPromo && !(p.promo || p.precoDe)) return false;
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
  secoes.forEach(sc => { sc.el.hidden = sc.idx.every(i => lis[i].hidden); });
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

/* ===== AVISOS (POP-UP) ===== */
const aviso = $("aviso");
const forcar = params.has("aviso");
const chaveAviso = a => "ob-aviso-" + (a.id || a.titulo);
const jaViu = a => { try { return localStorage.getItem(chaveAviso(a)) === dataHoje; } catch { return false; } };
const marcarVisto = a => { try { localStorage.setItem(chaveAviso(a), dataHoje); } catch {} };
const fila = AVISOS.filter(a => a.ativo !== false && vigente(a) && (forcar || a.sempre || !jaViu(a)));
let avisoAtual = null;

function proximoAviso() {
  avisoAtual = fila.shift() || null;
  if (!avisoAtual) {
    aviso.hidden = true;
    if (folha.hidden) document.body.style.overflow = "";
    return;
  }
  const a = avisoAtual, img = $("aviso-img");
  $("aviso-titulo").textContent = a.titulo || "";
  $("aviso-texto").textContent = a.texto || "";
  $("aviso-texto").hidden = !a.texto;
  img.hidden = !a.imagem;
  img.onerror = () => { img.hidden = true; };
  if (a.imagem) { img.alt = a.titulo || ""; img.src = a.imagem; }
  $("aviso-ok").textContent = a.botao || "Ver cardápio";
  aviso.hidden = false;
  document.body.style.overflow = "hidden";
  marcarVisto(a);
  $("aviso-ok").focus();
}

function fecharAviso() { proximoAviso(); }

aviso.addEventListener("click", e => { if (e.target.closest("[data-fechar-aviso]")) fecharAviso(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !aviso.hidden) fecharAviso(); });

$("aviso-ok").addEventListener("click", () => {
  const a = avisoAtual;
  if (!a.soPromocoes && !a.buscar) { fecharAviso(); return; }
  fila.length = 0;            // o cliente quer ver os produtos: não mostra os próximos avisos
  proximoAviso();
  if (a.soPromocoes) { chkPromo.checked = true; filtro.soPromo = true; }
  if (a.buscar) { $("busca").value = a.buscar; filtro.texto = a.buscar; }
  aplicarFiltros();
  $("busca").scrollIntoView({ behavior: "smooth", block: "start" });
});

proximoAviso();
