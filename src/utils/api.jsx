import axios from "axios"
import { API } from '@env'

const api = axios.create({
  baseURL: API
})

export default api
