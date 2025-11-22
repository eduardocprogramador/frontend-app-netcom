import axios from "axios"
import { ODOO_BASE } from '@env'

const odoo = axios.create({
  baseURL: ODOO_BASE
})

export default odoo
