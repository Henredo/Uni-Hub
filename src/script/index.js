import { carregarMidias, removerMidia } from "./storage.js";

/* ============================
   MENU LATERAL
============================ */
const btnMenu = document.querySelector("#menu");
const barraLado = document.querySelector("#barra-lado");

btnMenu?.addEventListener("click", () => {
    barraLado.classList.toggle("aberto");
});

/* ============================
   LINKS DO MENU
============================ */
document.querySelector("#menu-add")?.addEventListener("click", () => {
    window.location.href = "tela-add.html";
});

document.querySelector("#menu-inicio")?.addEventListener("click", () => {
    window.location.href = "index.html";
});

/* ============================
   ÁREA DOS CARDS
============================ */
const container = document.querySelector("#midias-scroller");

let modoHorizontal = false;
let filtroAtual = "all";

/* ============================
   BOTÃO NO MENU PARA MODO HORIZONTAL
============================ */
document.querySelector("#menu-biblioteca")?.addEventListener("click", () => {
    modoHorizontal = !modoHorizontal;

    if (modoHorizontal) {
        container.classList.add("horizontal-ativo");
    } else {
        container.classList.remove("horizontal-ativo");
    }

    carregarCards();
});

/* ============================
   BOTÕES DE FILTRO
============================ */
const btnFiltroAll = document.querySelector(".filter_all_button");
const btnFiltroGames = document.querySelector(".filter_games_button");
const btnFiltroBooks = document.querySelector(".filter_books_button");
const btnFiltroTv = document.querySelector(".filter_tv_button");

function limparAtivos() {
    btnFiltroGames.classList.remove("filtro-ativo");
    btnFiltroBooks.classList.remove("filtro-ativo");
    btnFiltroTv.classList.remove("filtro-ativo");
}

btnFiltroAll?.addEventListener("click", () => {
    filtroAtual = "all";
    limparAtivos();
    carregarCards();
});

btnFiltroGames?.addEventListener("click", () => {
    filtroAtual = "game";
    limparAtivos();
    btnFiltroGames.classList.add("filtro-ativo");
    carregarCards();
});

btnFiltroBooks?.addEventListener("click", () => {
    filtroAtual = "book";
    limparAtivos();
    btnFiltroBooks.classList.add("filtro-ativo");
    carregarCards();
});

btnFiltroTv?.addEventListener("click", () => {
    filtroAtual = "serie";
    limparAtivos();
    btnFiltroTv.classList.add("filtro-ativo");
    carregarCards();
});

/* ============================
   PESQUISA
============================ */
const campoPesquisa = document.querySelector("#campo-pesquisa");

campoPesquisa?.addEventListener("input", () => {
    carregarCards();
});

function aplicarPesquisa(lista) {
    const texto = campoPesquisa.value.trim().toLowerCase();
    if (texto === "") return lista;

    return lista.filter(m => m.nome.toLowerCase().includes(texto));
}

/* ============================
   TEMA / CUSTOMIZAÇÃO
============================ */
const btnTema = document.querySelector("#menu-custom");
const SeletorTema = document.querySelector("#menu-seletor");
const BackgroundTema = document.querySelector("#background-seletor");
const styleCSS = document.querySelector("#tema-css");

const temaNS1 = document.querySelector("#tema-nin-dark");
const temaNS2 = document.querySelector("#tema-nin-light");
const temaNet = document.querySelector("#tema-netflix");

// Abre o seletor
btnTema?.addEventListener("click", () => {
    BackgroundTema.classList.toggle("aberto");
    SeletorTema.classList.toggle("aberto");
});

// Troca de tema
function trocarTema(arquivo) {
    BackgroundTema.classList.remove("aberto");
    SeletorTema.classList.remove("aberto");
    styleCSS.href = arquivo;
    localStorage.setItem("tema", arquivo);
}

temaNS1?.addEventListener("click", () => trocarTema("../styles/switch-dark.css"));
temaNS2?.addEventListener("click", () => trocarTema("../styles/switch-light.css"));
temaNet?.addEventListener("click", () => trocarTema("../styles/netflix.css"));

/* ============================
   CRIAR CARD
============================ */
function criarCard(midia) {
    const card = document.createElement("div");
    card.classList.add("midias-container");

    if (modoHorizontal) card.classList.add("horizontal-card");

    card.innerHTML = `
        <img src="${midia.image}" class="midia-img" data-url="${midia.url}">
        <h3 class="midia-nome">${midia.nome}</h3>
        <button class="btn-remover" data-id="${midia.id}">
            <img src="../assets/delete.png" class="icon-remover">
        </button>
    `;

    card.querySelector(".midia-img")?.addEventListener("click", () => {
        if (midia.url) window.open(midia.url, "_blank");
    });

    return card;
}

/* ============================
   RENDERIZAR CARDS
============================ */
function carregarCards() {
    const midias = carregarMidias();
    container.innerHTML = "";

    let filtradas = midias;

    if (filtroAtual === "game") filtradas = filtradas.filter(m => m.tipo === "game");
    else if (filtroAtual === "book") filtradas = filtradas.filter(m => m.tipo === "book");
    else if (filtroAtual === "serie") filtradas = filtradas.filter(m => m.tipo === "serie");

    filtradas = aplicarPesquisa(filtradas);

    if (filtradas.length === 0) {
        container.innerHTML = "<p>Nenhuma mídia cadastrada.</p>";
        return;
    }

    filtradas.forEach(midia => {
        container.appendChild(criarCard(midia));
    });

    document.querySelectorAll(".btn-remover").forEach(btn => {
        btn.addEventListener("click", () => {
            removerMidia(btn.getAttribute("data-id"));
            carregarCards();
        });
    });
}

carregarCards();
