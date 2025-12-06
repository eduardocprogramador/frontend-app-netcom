import { FlatList, StyleSheet, View, Text } from "react-native"
import api from "../utils/api"
import { useState, useEffect } from "react"
import Card from "../components/Horario/Card"
import { vs, s } from 'react-native-size-matters'
import bs from "../../library/bootstrap"
import Loading from "../components/Loading"
import { useSelector } from "react-redux"
import { toast } from "../utils/toast"
import { Select, Option, Btn } from "../../library/html"
import { Color } from "../../library/colors"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { getTurmaMatriculado } from "../utils/getTurmaMatriculado"

const Horario = () => {
  const [horario, setHorario] = useState([])
  const [turmas, setTurmas] = useState([])
  const [turmaMatriculado, setTurmaMatriculado] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [loading, setLoading] = useState(true)
  const partner_id = useSelector(state => state.userReducer.userData?.partner_id)
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        const { data: turmasData } = await api.post("/app/horarios_disponiveis")
        setTurmas(turmasData)
        const codigoTurma = await getTurmaMatriculado(partner_id)
        if (codigoTurma) {
          setTurmaMatriculado(codigoTurma)
          setSelectedOption(codigoTurma)
          const payload = { codigo: codigoTurma }
          const { data } = await api.post("/app/horario_codigo_turma", payload)
          const { horarios, curso_turma_codigo, curso_nome } = data
          setHorario(horarios)
        }
      } catch (error) {
        toast.error('Erro ao carregar dados iniciais')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [partner_id])
  async function getHorarioCodigoTurma() {
    const payload = { codigo: selectedOption }
    setLoading(true)
    try {
      const { data } = await api.post("/app/horario_codigo_turma", payload)
      const { horarios, curso_turma_codigo, curso_nome } = data
      setHorario(horarios)
      setSelectedOption(curso_turma_codigo)
    } catch (error) {
      toast.error('Erro ao buscar o horário')
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <View style={bs('container')}>
      <View style={bs('row', 'my-1')}>
        <View style={bs('flex-1')}>
          <Select value={selectedOption} onChange={setSelectedOption} textStyle={{ fontSize: s(10) }} optionTextStyle={{ fontSize: s(10) }}>
            {turmas.map((item, index) => (
              <Option value={item.curso_turma}>
                [{item.curso_turma}] - {item.curso}
              </Option>
            ))}
          </Select>
        </View>
        <View>
          <Btn color={Color.primary} style={bs('px-2')} onPress={getHorarioCodigoTurma}>
            <FontAwesome name="search" size={s(16)} color="white" />
          </Btn>
        </View>
      </View>
      <FlatList
        data={horario}
        keyExtractor={(value) => value.dia_index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
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
