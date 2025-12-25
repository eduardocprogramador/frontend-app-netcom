import { StyleSheet, FlatList } from 'react-native'
import Card from '../components/Home/Card'
import bs from '../../library/bootstrap'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Btn } from '../../library/html'
import { Color } from '../../library/colors'
import { logout } from '../utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import { s } from 'react-native-size-matters'
import { handleHistorico } from '../utils/handleHistorico'

const cards = [
  {
    id: '1',
    text: 'Horários',
    icon: 'calendar',
    color: '#2563eb'
  },
  {
    id: '2',
    text: 'Histórico',
    icon: 'history',
    color: '#16a34a'
  },
  {
    id: '3',
    text: 'Boleto',
    icon: 'money',
    color: '#f59e0b'
  },
  {
    id: '4',
    text: 'Avisos (Em Breve)',
    icon: 'bell-o',
    color: '#dc2626'
  }
]

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const partner_id = useSelector(state => state.userReducer.userData?.partner_id)
  return (
    <SafeAreaView style={bs('container')}>
      <Btn style={bs('w-25', 'ms-auto')} childrenStyle={{ fontSize: s(10) }} color={Color.danger} onPress={() => logout(navigation, dispatch)}>Sair</Btn>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.centerContent}
        renderItem={({ item }) => (
          <Card
            text={item.text}
            icon={item.icon}
            color={item.color}
            // Avisos desabilitados por enquanto
            disabled={item.text == 'Avisos (Em Breve)'}
            onPress={
              // se for Histórico chama a função handleHistorico
              item.text != 'Histórico' ? (
                () => navigation.navigate(item.text)
              ) : (
                () => handleHistorico(partner_id)
              )
            }
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  centerContent: {
    flexGrow: 1,
    justifyContent: 'space-around'
  }
})
