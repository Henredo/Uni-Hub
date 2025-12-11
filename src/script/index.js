import { carregarMidias, removerMidia } from "./storage.js";

// MENU LATERAL
const btnMenu = document.querySelector("#menu");
const barraLado = document.querySelector("#barra-lado");

btnMenu?.addEventListener("click", () => {
    barraLado.classList.toggle("aberto");
});

// LINKS DO MENU
document.querySelector("#menu-add")?.addEventListener("click", () => {
    window.location.href = "tela-add.html";
});

document.querySelector("#menu-inicio")?.addEventListener("click", () => {
    window.location.href = "index.html";
});

// ÁREA ÚNICA DE CARDS
const container = document.querySelector("#midias-scroller");

let modoHorizontal = false;

// BOTÃO PARA TROCAR MODO
document.querySelector("#menu-biblioteca")?.addEventListener("click", () => {
    modoHorizontal = !modoHorizontal;

    if (modoHorizontal) {
        container.classList.add("horizontal-ativo");
    } else {
        container.classList.remove("horizontal-ativo");
    }

    carregarCards();
});

// BOTÃO MENU TROCAR TEMA
const btnTema = document.querySelector("#menu-custom");
const SeletorTema = document.querySelector("#menu-seletor");
const BackgroundTema = document.querySelector("#background-seletor");

btnTema?.addEventListener("click", () => {
    BackgroundTema.classList.toggle("aberto");
    SeletorTema.classList.toggle("aberto");
});

//BOTÕES DE TROCA DE TEMA
const styleCSS = document.querySelector("#tema-css");
const temaNS1 = document.querySelector("#tema-nin-dark");
const temaNS2 = document.querySelector("#tema-nin-light");
const temaNet = document.querySelector("#tema-netflix");

temaNS1?.addEventListener("click", () => {
    BackgroundTema.classList.toggle("aberto");
    SeletorTema.classList.toggle("aberto");
    styleCSS.href = "../styles/switch-dark.css";
    localStorage.setItem('tema', "../styles/switch-dark.css");
});

temaNS2?.addEventListener("click", () => {
    BackgroundTema.classList.toggle("aberto");
    SeletorTema.classList.toggle("aberto");
    styleCSS.href = "../styles/switch-light.css";
    localStorage.setItem('tema', "../styles/switch-light.css");
});

temaNet?.addEventListener("click", () => {
    BackgroundTema.classList.toggle("aberto");
    SeletorTema.classList.toggle("aberto");
    styleCSS.href = "../styles/netflix.css";
    localStorage.setItem('tema', "../styles/netflix.css");
});


// CRIAÇÃO DOS CARDS
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

    card.querySelector(".midia-img").addEventListener("click", () => {
        if (midia.url) window.open(midia.url, "_blank");
    });

    return card;
}

// RENDERIZAÇÃO
function carregarCards() {
    const midias = carregarMidias();
    container.innerHTML = "";

    if (midias.length === 0) {
        container.innerHTML = "<p>Nenhuma mídia cadastrada.</p>";
        return;
    }

    midias.forEach(midia => {
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
