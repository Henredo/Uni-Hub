
const styleCSS = document.querySelector("#tema-css");

if (styleCSS) {

    let unitema = localStorage.getItem('tema');

    if (!unitema) {
        unitema = "../styles/switch-dark.css";
        localStorage.setItem('tema', unitema);
    }

    if (!styleCSS.href.includes(unitema)) {
        styleCSS.href = unitema;
    }
}
