import api from "./api"

// pega a turma que o aluno está matriculado com base no id
export async function getTurmaMatriculado(partner_id) {
    const payload = { partner_id }
    try {
        const { data } = await api.post("/app/turma_matriculado", payload)
        return data.codigo_turma
    } catch (error) {
        toast.error('Erro ao buscar a turma do aluno')
        return null
    }
}