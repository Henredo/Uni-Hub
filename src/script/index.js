import { carregarMidias, removerMidia } from "./storage.js";

// ========== MENU ==========
const btnMenu = document.querySelector("#menu");
const barraLado = document.querySelector("#barra-lado");

if (btnMenu && barraLado) {
    btnMenu.addEventListener("click", () => {
        barraLado.classList.toggle("aberto");
    });
}

// ========== BOTÕES DO MENU ==========
document.querySelector("#menu-add").addEventListener("click", () => {
    window.location.href = "tela-add.html";
});

document.querySelector("#menu-inicio").addEventListener("click", () => {
    window.location.href = "index.html";
});

// ========== LISTAGEM ==========
const container = document.querySelector(".midia-container");

function criarCard(midia) {
    const card = document.createElement("div");
    card.classList.add("midia-card");

    card.innerHTML = `
        <img src="${midia.image}" class="midia-img">
        <h3 class="midia-nome">${midia.nome}</h3>
        <p class="midia-tag">Tag: ${midia.tag}</p>

        <button class="btn-remover" data-id="${midia.id}">
            Remover
        </button>
    `;

    return card;
}

function carregarCards() {
    const midias = carregarMidias();
    container.innerHTML = "";

    if (midias.length === 0) {
        container.innerHTML = "<p>Nenhuma mídia cadastrada.</p>";
        return;
    }

    midias.forEach(midia => {
        const card = criarCard(midia);
        container.appendChild(card);
    });

    // Eventos dos botões de remover
    document.querySelectorAll(".btn-remover").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            removerMidia(id);
            carregarCards();
        });
    });
}

carregarCards();
