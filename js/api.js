const URL_BASE = "http://localhost:3000";
const api = {
    async obterPensamentos(){
        try {
            const lRespostaDePensamentos = await axios.get(`${URL_BASE}/pensamentos`);
            return await lRespostaDePensamentos.data;
        } catch (lErro) {
            alert(`Erro ao buscar seus pensamentos! ${lErro.name}: ${lErro.message}`); 
            throw lErro;   
        }
    },

    async obterPensamento(pIDDoPensamento){
        try {
            const lRespostaDePensamentos = await axios.get(`${URL_BASE}/pensamentos/${pIDDoPensamento}`);
            return await lRespostaDePensamentos.data;
        } catch (lErro) {
            alert(`Erro ao buscar o pensamento (id ${pIDDoPensamento})! ${lErro.name}: ${lErro.message}`); 
            throw lErro;   
        }
    },
    
    async salvarPensamento(pPensamento){
        try {
            const lRespostaDePensamentos = await axios.post(`${URL_BASE}/pensamentos`, pPensamento);
            return await lRespostaDePensamentos.data;
        } catch (lErro) {
            alert(`Erro ao salvar pensamento! ${lErro.name}: ${lErro.message}`); 
            throw lErro;   
        }
    },

    async atualizarPensamento(pPensamento){
        try {
            const lRespostaDePensamentos = await axios.put(`${URL_BASE}/pensamentos/${pPensamento.id}`,pPensamento);
            return await lRespostaDePensamentos.data;
        } catch (lErro) {
            alert(`Erro ao atualizar pensamento! ${lErro.name}: ${lErro.message}`); 
            throw lErro;   
        }

    },

    async excluirPensamento(pIDDoPensamento){
        try {
            await axios.delete(`${URL_BASE}/pensamentos/${pIDDoPensamento}`);
        } catch (lErro) {
            alert(`Erro ao excluir pensamento! ${lErro.name}: ${lErro.message}`); 
            throw lErro;   
        }

    }
}

export default api;