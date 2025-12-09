import { toast } from './toast'
import { setUserData } from '../redux/reducers/userReducer'
import { persistor } from '../redux/store'
import api from './api'

export async function login(matricula, senha, navigation, dispatch, setLoading) {
  if (matricula == '' || senha == '') {
    toast.info('Preencha todos os campos')
    return
  }
  setLoading(true)
  try {
    const { data } = await api.post('/app/login', { matricula, senha })
    const { uid, partner_id } = data
    if (uid) {
      dispatch(setUserData({ uid, partner_id }))
      navigation.replace('Screens')
      return true
    }
    toast.error('Login e/ou senha inválidas')
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