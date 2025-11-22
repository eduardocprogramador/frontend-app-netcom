import { FlatList, StyleSheet, View, Text } from "react-native"
import api from "../utils/api"
import { useState, useEffect } from "react"
import Card from "../components/Horario/Card"
import { vs, s } from 'react-native-size-matters'
import bs from "../../library/bootstrap"
import Loading from "../components/Loading"
import { useSelector } from "react-redux"
import { toast } from "../utils/toast"

const Horario = () => {
  const [horario, setHorario] = useState([])
  const [codigo, setCodigo] = useState('')
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(true)
  const partner_id = useSelector(state => state.userReducer.userData?.partner_id)
  useEffect(() => {
    async function getHorario() {
      const payload = { partner_id }
      try {
        const { data } = await api.post("/app/horario", payload)
        const { horarios, curso_turma_codigo, curso_nome } = data
        setHorario(horarios)
        setCodigo(curso_turma_codigo)
        setNome(curso_nome)
      } catch (error) {
        toast.error('Erro ao buscar o horário')
      }
      setLoading(false)
    }
    getHorario()
  }, [])
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <View style={bs('container')}>
      <Text style={styles.text}>[{codigo}] - {nome}</Text>
      <FlatList
        data={horario}
        keyExtractor={(value) => value.dia_index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Card
            style={styles.card}
            dia_semana={item.dia_semana}
            hora_inicio={item.hora_inicio}
            hora_termino={item.hora_termino}
            disciplina={item.disciplina}
            professor={item.professor}
            sala={item.sala}
          />
        )}
      />
    </View>
  )
}

export default Horario

const styles = StyleSheet.create({
  card: {
    marginBottom: vs(8),
    marginTop: vs(8),
  },
  text: {
    marginVertical: vs(10),
    fontWeight: 600,
    textAlign: 'center',
    fontSize: s(13)
  }
})
