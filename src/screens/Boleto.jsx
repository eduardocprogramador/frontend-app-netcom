import { FlatList, StyleSheet, View } from "react-native"
import api from "../utils/api"
import { useState, useEffect } from "react"
import Card from "../components/Boleto/Card"
import { vs, s } from 'react-native-size-matters'
import bs from "../../library/bootstrap"
import Loading from "../components/Loading"
import { useSelector } from "react-redux"
import Title from "../components/Title"

const Boleto = () => {
  const [boletosNumero, setBoletosNumero] = useState([])
  const [boletos, setBoletos] = useState([])
  const [loading, setLoading] = useState(true)
  const partner_id = useSelector(state => state.userReducer.userData?.partner_id)
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        // pega todos os identificadores dos boletos do Banco do Brasil do aluno
        const { data: boletosNumeroBB } = await api.get(`/app/boletos?partner_id=${partner_id}`)
        setBoletosNumero(boletosNumeroBB)
        const detalhes = await Promise.all(
          boletosNumeroBB.map(async (numero) => {
            const { data } = await api.get(`/app/boleto/${numero}`)
            return data
          })
        )
        setBoletos(detalhes)
      } catch (error) {
        setBoletos(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [partner_id])
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <View style={bs('container')}>
      {boletos == null ? (
        <View style={bs('container', 'center')}>
          <Title>Nenhum boleto pendente</Title>
        </View>
      ) : (
        <FlatList
          data={boletos}
          keyExtractor={(value) => value.numeroBoletoBB}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              status="ABERTO"
              vencimento={item.vencimento}
              valor={item.valor}
              linhaDigitavel={item.linhaDigitavel}
              pagador={item.pagador}
            />
          )}
        />
      )}
    </View>
  )
}

export default Boleto

const styles = StyleSheet.create({
  card: {
    marginBottom: vs(8),
    marginTop: vs(8),
  }
})
