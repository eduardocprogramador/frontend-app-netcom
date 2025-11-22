import { StyleSheet, View } from 'react-native'
import { vs, s } from 'react-native-size-matters'
import bs from '../../../library/bootstrap'
import Badge from '../Badge'
import Title from '../Title'
import Descricao from './Descricao'

const Card = ({ data, horario, titulo, descricao, style }) => {
  return (
    <View style={[bs('container', 'elevation'), styles.card, style]}>
      <View style={bs('row', 'justify-content-around', 'mb-2')}>
        <Badge color='#3e455bff'>📅 {data}</Badge>
        <Badge color='#3e455bff'>{horario}</Badge>
      </View>
      <View>
        <Title>{titulo}</Title>
        <Descricao>{descricao}</Descricao>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: s(16),
    padding: s(15)
  },
})