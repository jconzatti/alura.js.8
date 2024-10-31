import ui from "./ui.js";

document.addEventListener("DOMContentLoaded", () =>{
    ui.renderizarMuralDePensamentos();
    const lElementoFormularioDePensamento = document.getElementById("pensamento-form");
    lElementoFormularioDePensamento.addEventListener("submit", ui.submeterFormularioDoPensamento);
    const lElementoCancelarPensamento = document.getElementById("botao-cancelar");
    lElementoCancelarPensamento.addEventListener("click", ui.cancelarFormularioDoPensamento);
});