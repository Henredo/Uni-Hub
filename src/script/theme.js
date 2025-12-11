//CARREGAR TEMA
const styleCSS = document.querySelector("#tema-css");
const unitema = localStorage.getItem('tema');
if (unitema !== styleCSS.href) {
    styleCSS.href = unitema;
} else if (unitema == null) {
    localStorage.setItem('tema', "../styles/switch-dark.css");
}