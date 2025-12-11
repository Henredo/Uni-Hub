const STORAGE_KEY = "unihub_midias";

export function carregarMidias() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function salvarMidias(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function salvarTema(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function adicionarMidia(midia) {
    const lista = carregarMidias();

    const existe = lista.some(m => m.nome.toLowerCase() === midia.nome.toLowerCase());
    if (existe) {
        return { success: false, message: "Já existe uma mídia com esse nome!" };
    }

    if (!midia.image) {
        return { success: false, message: "Selecione uma imagem!" };
    }

    lista.push(midia);
    salvarMidias(lista);

    return { success: true, message: "Mídia adicionada com sucesso!" };
}

export function removerMidia(id) {
    const lista = carregarMidias().filter(m => m.id !== id);
    salvarMidias(lista);
}