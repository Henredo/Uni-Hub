import { adicionarMidia } from "./storage.js";

// MENU LATERAL
const btnMenu = document.querySelector("#menu");
const barraLado = document.querySelector("#barra-lado");

if (btnMenu && barraLado) {
    btnMenu.addEventListener("click", () => {
        barraLado.classList.toggle("aberto");
    });
}

// BOTÕES MENU
document.querySelector("#menu-inicio").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.querySelector("#menu-add").addEventListener("click", () => {
    window.location.href = "tela-add.html";
});

// FORMULÁRIO
document.addEventListener("DOMContentLoaded", () => {

    const inputImage = document.getElementById("add-image");
    const textImage = document.getElementById("texto-add-imagem");
    const btnSalvar = document.getElementById("salvar");

    let imagemBase64 = "";

    // Carregar imagem (Base64)
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

        const radios = document.querySelectorAll("input[name='tipo']");
        let tipoSelecionado = "";

        radios.forEach(r => {
            if (r.checked) tipoSelecionado = r.nextElementSibling.innerText;
        });

        const novaMidia = {
            id: Date.now().toString(),
            nome: nome,
            url: url,
            tipo: tipoSelecionado,
            tag: tag,
            image: imagemBase64
        };

        const resultado = adicionarMidia(novaMidia);
        alert(resultado.message);

        if (resultado.success) {
            window.location.href = "index.html";
        }
    });

});
