const styleCSS = document.querySelector("#tema-css");
const unitema = localStorage.getItem('tema');
const temaPadrao = "../styles/switch-dark.css";

if (unitema === null) {
    localStorage.setItem('tema', temaPadrao);
    styleCSS.setAttribute("href", temaPadrao);

} else {if (styleCSS.getAttribute("href") !== unitema) {
        styleCSS.setAttribute("href", unitema);
    }
}