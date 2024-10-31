import api from "./api.js"

const ui = {
    async renderizarMuralDePensamentos(){
        const lElementoConteinerDoMuralDePensamentos = document.getElementById("lista-pensamentos-container");
        lElementoConteinerDoMuralDePensamentos.innerHTML = "<h3>Meu Mural</h3>";
        try {
            const lPensamentos = await api.obterPensamentos();  
            if (lPensamentos.length > 0){
                renderizarListaDePensamentosNoMural(lElementoConteinerDoMuralDePensamentos, lPensamentos);
            } else {
                renderizarMuralSemPensamentos(lElementoConteinerDoMuralDePensamentos);
            }
        } catch (lErro) {
            alert(`Erro ao renderizar seus pensamentos! ${lErro.name}: ${lErro.message}`); 
            throw lErro;   
        }
    },

    async submeterFormularioDoPensamento(pEvento){
        pEvento.preventDefault();
        const lID = document.getElementById("pensamento-id").value;
        const lConteudo = document.getElementById("pensamento-conteudo").value;
        const lAutoria = document.getElementById("pensamento-autoria").value;
        try {
            if (lID){
                await api.atualizarPensamento({id: lID, conteudo: lConteudo, autoria: lAutoria});
            } else {
                await api.salvarPensamento({conteudo: lConteudo, autoria: lAutoria});
            } 
            ui.renderizarMuralDePensamentos();  
        } catch (lErro) {
            alert(`Erro ao salvar pensamento! ${lErro.name}: ${lErro.message}`); 
            throw lErro; 
        }
    },

    cancelarFormularioDoPensamento(){
        limparFormularioDoPensamento();
    }
}

function renderizarListaDePensamentosNoMural(pElementoConteinerDoMuralDePensamentos, pPensamentos){
    const lElementoListaDePensamentos = document.createElement("ul");
    lElementoListaDePensamentos.id = "lista-pensamentos"; 
    pElementoConteinerDoMuralDePensamentos.appendChild(lElementoListaDePensamentos); 
    pPensamentos.forEach((lPensamento) => {
        adicionarPensamentoNaLista(lElementoListaDePensamentos, lPensamento)
    });
}

function adicionarPensamentoNaLista(pElementoListaDePensamentos, pPensamento){
    const lElementoItemDaListaDePensamentos = document.createElement("li");
    lElementoItemDaListaDePensamentos.setAttribute("data-id", pPensamento.id);
    lElementoItemDaListaDePensamentos.classList.add("li-pensamento");

    const lElementoIconeAspas = document.createElement("img");
    lElementoIconeAspas.src = "assets/imagens/aspas-azuis.png";
    lElementoIconeAspas.alt = "Aspas azuis";
    lElementoIconeAspas.classList.add("icone-aspas");

    const lElementoConteudoDoPensamento = document.createElement("div");
    lElementoConteudoDoPensamento.classList.add("pensamento-conteudo");
    lElementoConteudoDoPensamento.textContent = pPensamento.conteudo;

    const lElementoAutoriaDoPensamento = document.createElement("div");
    lElementoAutoriaDoPensamento.classList.add("pensamento-autoria");
    lElementoAutoriaDoPensamento.textContent = pPensamento.autoria;

    const lElementoBotaoEditarPensamento = document.createElement("button");
    lElementoBotaoEditarPensamento.classList.add("botao-editar");
    lElementoBotaoEditarPensamento.onclick = () => {
        preencherFormularioDoPensamento(pPensamento.id);
        document.querySelector("main").scrollIntoView();
    };
    
    const lElementoIconeEditarPensamento = document.createElement("img");
    lElementoIconeEditarPensamento.src = "assets/imagens/icone-editar.png";
    lElementoIconeEditarPensamento.alt = "Editar";
    lElementoBotaoEditarPensamento.appendChild(lElementoIconeEditarPensamento);

    const lElementoBotaoExcluirPensamento = document.createElement("button");
    lElementoBotaoExcluirPensamento.classList.add("botao-excluir");
    lElementoBotaoExcluirPensamento.onclick = async () => {
        try {
            await api.excluirPensamento(pPensamento.id);
            ui.renderizarMuralDePensamentos();  
        } catch (lErro) {
            alert(lErro.message); 
            throw lErro; 
        }
    };
    
    const lElementoIconeExcluirPensamento = document.createElement("img");
    lElementoIconeExcluirPensamento.src = "assets/imagens/icone-excluir.png";
    lElementoIconeExcluirPensamento.alt = "Editar";
    lElementoBotaoExcluirPensamento.appendChild(lElementoIconeExcluirPensamento);

    const lElementoConteinerDasAcoesDoPensamento = document.createElement("div");
    lElementoConteinerDasAcoesDoPensamento.classList.add("icones");
    lElementoConteinerDasAcoesDoPensamento.appendChild(lElementoBotaoEditarPensamento);
    lElementoConteinerDasAcoesDoPensamento.appendChild(lElementoBotaoExcluirPensamento);

    lElementoItemDaListaDePensamentos.appendChild(lElementoIconeAspas);
    lElementoItemDaListaDePensamentos.appendChild(lElementoConteudoDoPensamento);
    lElementoItemDaListaDePensamentos.appendChild(lElementoAutoriaDoPensamento);
    lElementoItemDaListaDePensamentos.appendChild(lElementoConteinerDasAcoesDoPensamento);
    pElementoListaDePensamentos.appendChild(lElementoItemDaListaDePensamentos);
}

function renderizarMuralSemPensamentos(pElementoConteinerDoMuralDePensamentos){
    const lElementoPagragrafoNenhumPensamento = document.createElement("p");
    lElementoPagragrafoNenhumPensamento.textContent = "Nada por aqui ainda, que tal compartilhar alguma ideia?";
    pElementoConteinerDoMuralDePensamentos.appendChild(lElementoPagragrafoNenhumPensamento);

    const lElementoImagemNenhumPensamento = document.createElement("img");
    lElementoImagemNenhumPensamento.src = "assets/imagens/lista-vazia.png";
    lElementoImagemNenhumPensamento.alt = "Lista vazia";
    pElementoConteinerDoMuralDePensamentos.appendChild(lElementoImagemNenhumPensamento);
}

function limparFormularioDoPensamento(){
    document.getElementById("pensamento-form").reset();
    //document.getElementById("pensamento-id").value = "";
    //document.getElementById("pensamento-conteudo").value = "";
    //document.getElementById("pensamento-autoria").value = "";
}

async function preencherFormularioDoPensamento(pIDDoPensamento){
    const lPensamento = await api.obterPensamento(pIDDoPensamento);
    document.getElementById("pensamento-id").value = lPensamento.id;
    document.getElementById("pensamento-conteudo").value = lPensamento.conteudo;
    document.getElementById("pensamento-autoria").value = lPensamento.autoria;
}

export default ui;