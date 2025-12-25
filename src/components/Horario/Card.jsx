import { StyleSheet, View } from 'react-native'
import { vs, s } from 'react-native-size-matters'
import bs from '../../../library/bootstrap'
import Badge from '../Badge'
import Label from '../Label'
import Title from '../Title'

const Card = ({ dia_semana, hora_inicio, hora_termino, disciplina, professor, sala, style }) => {
  return (
    <View style={[bs('container', 'elevation'), styles.card, style]}>
      <View style={bs('row', 'justify-content-around', 'mb-2')}>
        <Badge color='#1D4ED8'>{dia_semana}</Badge>
        <Badge color='#3e455bff'>{hora_inicio}</Badge>
        <Badge color='#3e455bff'>{hora_termino}</Badge>
      </View>
      <View>
        <Label>Disciplina</Label>
        <Title>{disciplina}</Title>
      </View>
      <View style={bs('row')}>
        <View style={[bs('ms-1'), {width: '70%'}]}>
          <Label>Professor</Label>
          <Title>{professor}</Title>
        </View>
        <View style={{width: '25%'}}>
          <Label>Sala</Label>
          <Title>{sala}</Title>
        </View>
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