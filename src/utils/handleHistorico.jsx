import * as WebBrowser from "expo-web-browser"
import api from './api'

export async function handleHistorico(partner_id) {
    const url = `/app/historico/${partner_id}`
    const fullUrl = api.defaults.baseURL + url
    await WebBrowser.openBrowserAsync(fullUrl)
}