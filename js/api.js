const URL_BASE = "http://localhost:3000"

const api = {
  async buscarPensamentos() {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos`)
      return await response.data
    }
    catch {
      alert('Erro ao buscar pensamentos')
      throw error
    }
  },

  async salvarPensamento(pensamento) {
    try {
      const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento)
      return await response.data
    }
    catch {
      alert('Erro ao salvar pensamento')
      throw error
    }
  },

  async buscarPensamentoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
      return await response.data
    }
    catch {
      alert('Erro ao buscar pensamento')
      throw error
    }
  },

  async editarPensamento(pensamento) {
    try {
      const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)
      return await response.data
    }
    catch {
      alert('Erro ao editar pensamento')
      throw error
    }
  },

  async excluirPensamento(id) {
    try {
      const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`)
    }
    catch {
      alert('Erro ao excluir um pensamento')
      throw error
    }
  },

  async buscarPensamentosPorTermo(pTermo){
    try {
      const lPensamentos = await this.buscarPensamentos();
      const lTermoEmMinusculas = pTermo.toLowerCase();
      const lPensamentosFiltrados = lPensamentos.filter(lPensamento => {
        return lPensamento.conteudo.toLowerCase().includes(lTermoEmMinusculas) ||
          lPensamento.autoria.toLowerCase().includes(lTermoEmMinusculas);  
      });
      return lPensamentosFiltrados
    } catch (lErro) {
      alert('Erro ao filtrar um pensamento');
      throw lErro;
    }
  }
}

export default api