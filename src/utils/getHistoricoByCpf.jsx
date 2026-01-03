import * as WebBrowser from "expo-web-browser"
import api from './api'

// pega o histórico escolar do aluno com base no cpf
export async function getHistoricoByCpf(cpf) {
    const url = `/app/historico_cpf/${cpf}`
    const fullUrl = api.defaults.baseURL + url
    await WebBrowser.openBrowserAsync(fullUrl)
}