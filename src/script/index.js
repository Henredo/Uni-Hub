import { carregarMidias, removerMidia } from "./storage.js";

const btnMenu = document.querySelector("#menu");
const barraLado = document.querySelector("#barra-lado");

btnMenu?.addEventListener("click", () => {
    barraLado.classList.toggle("aberto");
});

document.querySelector("#menu-add")?.addEventListener("click", () => {
    window.location.href = "tela-add.html";
});

document.querySelector("#menu-inicio")?.addEventListener("click", () => {
    window.location.href = "index.html";
});

const container = document.querySelector("#midias-scroller");

let modoHorizontal = false;
let filtroAtual = "all";

const btnFiltroAll = document.querySelector(".filter_all_button");
const btnFiltroGames = document.querySelector(".filter_games_button");
const btnFiltroBooks = document.querySelector(".filter_books_button");
const btnFiltroTv = document.querySelector(".filter_tv_button");

const campoPesquisa = document.querySelector("#campo-pesquisa");

function limparAtivos() {
    btnFiltroGames.classList.remove("filtro-ativo");
    btnFiltroBooks.classList.remove("filtro-ativo");
    btnFiltroTv.classList.remove("filtro-ativo");
}

btnFiltroAll?.addEventListener("click", () => {
    modoHorizontal = !modoHorizontal;

    if (modoHorizontal) {
        container.classList.add("horizontal-ativo");
    } else {
        container.classList.remove("horizontal-ativo");
    }

    carregarCards();
});

btnFiltroGames?.addEventListener("click", () => {
    if (filtroAtual === "game") {
        filtroAtual = "all";
        limparAtivos();
    } else {
        filtroAtual = "game";
        limparAtivos();
        btnFiltroGames.classList.add("filtro-ativo");
    }
    carregarCards();
});

btnFiltroBooks?.addEventListener("click", () => {
    if (filtroAtual === "book") {
        filtroAtual = "all";
        limparAtivos();
    } else {
        filtroAtual = "book";
        limparAtivos();
        btnFiltroBooks.classList.add("filtro-ativo");
    }
    carregarCards();
});

btnFiltroTv?.addEventListener("click", () => {
    if (filtroAtual === "serie") {
        filtroAtual = "all";
        limparAtivos();
    } else {
        filtroAtual = "serie";
        limparAtivos();
        btnFiltroTv.classList.add("filtro-ativo");
    }
    carregarCards();
});

campoPesquisa?.addEventListener("input", () => {
    carregarCards();
});

function aplicarPesquisa(lista) {
    const texto = campoPesquisa.value.trim().toLowerCase();
    if (texto === "") return lista;

    return lista.filter(m => m.nome.toLowerCase().includes(texto));
}

function criarCard(midia) {
    const card = document.createElement("div");
    card.classList.add("midias-container");

    if (modoHorizontal) card.classList.add("horizontal-card");

    card.innerHTML = `
        <img src="${midia.image}" class="midia-img" data-url="${midia.url}">
        <h3 class="midia-nome">${midia.nome}</h3>

        <button class="btn-remover" data-id="${midia.id}">
            Remover
        </button>
    `;

    card.querySelector(".midia-img")?.addEventListener("click", () => {
        if (midia.url) window.open(midia.url, "_blank");
    });

    return card;
}

function carregarCards() {
    const midias = carregarMidias();
    container.innerHTML = "";

    let filtradas = midias;

    if (filtroAtual === "game") {
        filtradas = filtradas.filter(m => m.tipo === "game");
    }
    else if (filtroAtual === "book") {
        filtradas = filtradas.filter(m => m.tipo === "book");
    }
    else if (filtroAtual === "serie") {
        filtradas = filtradas.filter(m => m.tipo === "serie");
    }

    filtradas = aplicarPesquisa(filtradas);

    if (filtradas.length === 0) {
        container.innerHTML = "<p>Nenhuma mídia encontrada.</p>";
        return;
    }

    filtradas.forEach(midia => {
        container.appendChild(criarCard(midia));
    });

    document.querySelectorAll(".btn-remover").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            removerMidia(id);
            carregarCards();
        });
    });
}

carregarCards();
