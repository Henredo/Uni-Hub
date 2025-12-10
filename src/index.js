const btnMenu = document.querySelector("#menu");



const barraLado = document.querySelector("#barra-lado");





if (btnMenu && barraLado) {


    btnMenu.addEventListener("click", () => {


        console.log("Menu clicado!");


        barraLado.classList.toggle("aberto");


    });


} else {


    console.log("Erro: elementos não encontrados!");


}





const btnIni = document.querySelector("#menu-inicio");


const btnAdd = document.querySelector("#menu-add");





btnIni.addEventListener("click", () => {


    window.location.href = "index.html";


});





btnAdd.addEventListener("click", () => {


    window.location.href = "tela-add.html"; 


});