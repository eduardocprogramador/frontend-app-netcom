import axios from "axios"

const api = axios.create({
  baseURL: "https://backend-app-netcom.vercel.app/"
})

export default api
