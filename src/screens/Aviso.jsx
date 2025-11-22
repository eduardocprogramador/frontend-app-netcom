import { FlatList, StyleSheet, Text, View } from "react-native"
import api from "../utils/api"
import { useState, useEffect } from "react"
import Card from "../components/Aviso/Card"
import { vs, s } from 'react-native-size-matters'
import bs from "../../library/bootstrap"
import Loading from "../components/Loading"
import { toast } from "../utils/toast"

const Aviso = () => {
  const [avisos, setAvisos] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getAvisos() {
      try {
        const { data } = await api.get("/app/aviso")
        setAvisos(data)
      } catch (error) {
        toast.error('Erro ao buscar os avisos')
      }
      setLoading(false)
    }
    getAvisos()
  }, [])
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <View style={bs('container')}>
      <FlatList
        data={avisos}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
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
