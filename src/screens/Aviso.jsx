import { FlatList, StyleSheet, View } from "react-native"
import api from "../utils/api"
import { useState, useEffect } from "react"
import Card from "../components/Aviso/Card"
import { vs, s } from 'react-native-size-matters'
import bs from "../../library/bootstrap"
import Loading from "../components/Loading"
import { toast } from "../utils/toast"
import { Btn, Select, Option } from "../../library/html"
import { Color } from "../../library/colors"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useSelector } from "react-redux"
import { getTurmaMatriculado } from "../utils/getTurmaMatriculado"

const Aviso = () => {
  const [turmas, setTurmas] = useState([])
  const [avisos, setAvisos] = useState([])
  const [turmaMatriculado, setTurmaMatriculado] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [loading, setLoading] = useState(true)
  const partner_id = useSelector(state => state.userReducer.userData?.partner_id)
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        // pega todas as turmas que possuem horários cadastrados
        const { data: turmasData } = await api.post("/app/horarios_disponiveis")
        setTurmas(turmasData)
        // pega o código da turma do aluno logado
        const codigoTurma = await getTurmaMatriculado(partner_id)
        if (codigoTurma) {
          setTurmaMatriculado(codigoTurma)
          setSelectedOption(codigoTurma)
          const payloadAvisos = { codigo: codigoTurma }
          // pega os avisos da turma do aluno
          const { data: avisosData } = await api.post("/app/aviso_codigo_turma", payloadAvisos)
          setAvisos(avisosData)
        }
      } catch (error) {
        toast.error('Erro ao carregar dados iniciais')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [partner_id])
  async function getAvisosCodigoTurma() {
    if (!selectedOption) {
      toast.error('Selecione uma turma')
      return
    }
    const payload = { codigo: selectedOption }
    setLoading(true)
    try {
      const { data } = await api.post("/app/aviso_codigo_turma", payload)
      setAvisos(data)
    } catch (error) {
      toast.error('Erro ao buscar os avisos')
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return <Loading />
  }
  return (
    <View style={bs('container')}>
      <View style={bs('row', 'my-1')}>
        <View style={bs('flex-1')}>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            textStyle={{ fontSize: s(10) }}
            optionTextStyle={{ fontSize: s(10) }}
          >
            {turmas.map((item, index) => (
              <Option
                value={item.curso_turma}
              >
                [{item.curso_turma}] - {item.curso}
              </Option>
            ))}
          </Select>
        </View>
        <View>
          <Btn
            color={Color.primary}
            style={bs('px-2')}
            onPress={getAvisosCodigoTurma}
          >
            <FontAwesome name="search" size={s(16)} color="white" />
          </Btn>
        </View>
      </View>
      <FlatList
        data={avisos}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            data={item.data}
            horario={item.horario}
            titulo={item.titulo}
            descricao={item.descricao}
          />
        )}
      />
    </View>
  )
}

export default Aviso

const styles = StyleSheet.create({
  card: {
    marginBottom: vs(8),
    marginTop: vs(8),
  }
})
