import { adicionarMidia } from "./storage.js";

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

function urlValida(url) {
    try {
        const u = new URL(url);
        if (u.protocol === "http:" || u.protocol === "https:") return true;
        return false;
    } catch (err) {
        return false;
    }
}

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

        if (!urlValida(url)) {
            alert("URL inválida ou potencialmente maliciosa! Use apenas http:// ou https://");
            return;
        }

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

        const resultado = adicionarMidia(novaMidia);

        if (!resultado.success) {
            alert(resultado.message);
            return;
        }

        window.location.href = "index.html";
    });

});
