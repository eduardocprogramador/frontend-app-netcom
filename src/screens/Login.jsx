import { View } from 'react-native'
import bs from '../../library/bootstrap'
import { useState } from 'react'
import { Btn, Img, InputPassword, InputText, A } from '../../library/html'
import { Color } from '../../library/colors'
import { login } from '../utils/auth'
import { IMAGES } from '../utils/images'
import KeyboardAvoid from '../components/KeyboardAvoid'
import { useDispatch } from 'react-redux'

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  function handleLogin() {
    login(matricula, senha, navigation, dispatch, setLoading)
  }
  return (
    <KeyboardAvoid>
      <View style={bs('bg-light', 'container', 'center')}>
        <View style={bs('row', 'mb-3')}>
          <View style={bs('col-5')}>
            <Img src={IMAGES.logo} />
          </View>
        </View>
        <InputText style={bs('mb-3')} value={matricula} onChangeText={setMatricula} placeholder='Login' />
        <InputPassword style={bs('mb-3')} value={senha} onChangeText={setSenha} placeholder='Senha' />
        <Btn
          style={bs('mb-3')}
          color={Color.primary}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Btn>
      </View>
    </KeyboardAvoid>
  )
}

export default Login
