import ui from "./ui.js"
import api from "./api.js"

function removerEspacos(pTermo){
  return pTermo.replaceAll(/\s+/g, '')
}

const REGEX_CONTEUDO = /^[A-Za-z\s]{10,}$/

function validarConteudo(pConteudo){
  return REGEX_CONTEUDO.test(pConteudo)
}

const REGEX_AUTORIA = /^[A-Za-z]{3,15}$/

function validarAutoria(pAutoria){
  return REGEX_AUTORIA.test(pAutoria)
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos()

  const formularioPensamento = document.getElementById("pensamento-form")
  const botaoCancelar = document.getElementById("botao-cancelar")
  const inputBusca = document.getElementById("campo-busca")

  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
  inputBusca.addEventListener("input", manipularBusca)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("pensamento-id").value
  const conteudo = document.getElementById("pensamento-conteudo").value
  const autoria = document.getElementById("pensamento-autoria").value
  const data = document.getElementById("pensamento-data").value

  const conteudoSemEspacos = removerEspacos(conteudo)
  const autoriaSemEspacos = removerEspacos(autoria)

  if (!validarConteudo(conteudoSemEspacos)){
    alert("Conteúdo inválido!")
    return
  }

  if (!validarAutoria(autoriaSemEspacos)){
    alert("Autoria inválida!")
    return
  }

  if (!validarData(data)){
    alert("Não é permitido o registro de datas futuras! Selecione outra data!")
    return
  }

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data, favorito: false })
    } else {
      await api.salvarPensamento({ conteudo, autoria, data, favorito: false })
    }
    ui.renderizarPensamentos()
  } catch {
    alert("Erro ao salvar pensamento")
  }
}

function manipularCancelamento() {
  ui.limparFormulario()
}

async function manipularBusca(){
  const termoBusca = document.getElementById("campo-busca").value
  try {
    const lPensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca)
    ui.renderizarPensamentos(lPensamentosFiltrados)
    console.log(lPensamentosFiltrados)
  } catch (error) {
    alert("Erro ao realizar busca")
  }
}

function validarData(data){
  const dataAtual = new Date()
  const dataInserida = new Date(data)
  return dataInserida <= dataAtual
}