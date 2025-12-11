import { adicionarMidia } from "./storage.js";

// MENU
const btnMenu = document.querySelector("#menu");
const barraLado = document.querySelector("#barra-lado");

if (btnMenu && barraLado) {
    btnMenu.addEventListener("click", () => {
        barraLado.classList.toggle("aberto");
    });
}

document.querySelector("#menu-inicio").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.querySelector("#menu-add").addEventListener("click", () => {
    window.location.href = "tela-add.html";
});

// FORM
document.addEventListener("DOMContentLoaded", () => {

    const inputImage = document.getElementById("add-image");
    const textImage = document.getElementById("texto-add-imagem");
    const btnSalvar = document.getElementById("salvar");

    let imagemBase64 = "../assets/default.png"; // imagem padrão

    inputImage.addEventListener("change", () => {
        const file = inputImage.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            imagemBase64 = reader.result;
            textImage.textContent = "Imagem selecionada ✔";
        };

        reader.readAsDataURL(file);
    });

    btnSalvar.addEventListener("click", () => {

        const nome = document.getElementById("nome").value.trim();
        const url = document.getElementById("url").value.trim();
        const tag = document.getElementById("tags").value.trim();

        const tipoElemento = document.querySelector("input[name='tipo']:checked");
        const tipo = tipoElemento ? tipoElemento.value : "other";

        const novaMidia = {
            id: Date.now().toString(),
            nome,
            url,
            image: imagemBase64,
            tipo,
            tag
        };

        adicionarMidia(novaMidia);
        window.location.href = "index.html";
    });

});
