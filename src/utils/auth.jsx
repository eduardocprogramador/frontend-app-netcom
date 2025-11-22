import { toast } from './toast'
import odoo from './odoo'
import { setUserData } from '../redux/reducers/userReducer'
import { persistor } from '../redux/store'
import { DB_ODOO } from '@env'

export async function login(matricula, senha, navigation, dispatch, setLoading) {
  if (matricula == '' || senha == '') {
    toast.info('Preencha todos os campos')
    return
  }
  setLoading(true)
  try {
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        db: DB_ODOO,
        login: matricula,
        password: senha,
      },
    }
    const { data } = await odoo.post('/web/session/authenticate', payload)
    const uid = data?.result?.uid
    //const partner_id = data?.result?.partner_id
    const partner_id = 112161
    if (uid) {
      dispatch(setUserData({ uid, partner_id }))
      navigation.replace('Tabs')
      return true
    }
    toast.error('Matrícula e/ou senha inválidas')
    return false
  } catch (error) {
    toast.error('Erro. Tente mais tarde')
    return false
  } finally {
    setLoading(false)
  }
}
export function logout(navigation, dispatch) {
  dispatch(setUserData(null))
  persistor.purge()
  navigation.replace("AuthStack")
}