import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import bs from '../../library/bootstrap'
import { InputNumber, InputText, Btn, InputCPF, InputCEP } from '../../library/html'
import { useState, useEffect } from 'react'
import { vs, s } from 'react-native-size-matters'
import { Color } from '../../library/colors'
import KeyboardAvoid from '../components/KeyboardAvoid'
import * as WebBrowser from 'expo-web-browser'
import api from '../utils/api'
import { toast } from '../utils/toast'
import { capitalize } from '../utils/capitalize'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Boleto = () => {
  const [cpf, setCpf] = useState('')
  const [nome, setNome] = useState('')
  const [uf, setUf] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // recupera o que o usuário já digitou
    async function loadForm() {
      try {
        const json = await AsyncStorage.getItem('boleto_form')
        if (json) {
          const data = JSON.parse(json)
          setCpf(data.cpf || '')
          setNome(data.nome || '')
          setUf(data.uf || '')
          setCidade(data.cidade || '')
          setBairro(data.bairro || '')
          setCep(data.cep || '')
          setEndereco(data.endereco || '')
        }
      } catch (error) {
        console.log('Erro ao carregar formulário do boleto:', error)
      }
    }
    loadForm()
  }, [])
  useEffect(() => {
    // salva localmente o que o usuário digitou
    async function saveForm() {
      try {
        const data = {
          cpf,
          nome,
          uf,
          cidade,
          bairro,
          cep,
          endereco
        }
        await AsyncStorage.setItem('boleto_form', JSON.stringify(data))
      } catch (error) {
        console.log('Erro ao salvar formulário do boleto:', error)
      }
    }
    saveForm()
  }, [cpf, nome, uf, cidade, bairro, cep, endereco])
  async function handleBoleto() {
    if (cpf == '' || nome == '' || uf == '' || cidade == '' || bairro == '' || cep == '' || endereco == '') {
      toast.error('Preencha todos os campos')
      return
    }
    const payload = {
      pagador: {
        tipoInscricao: 1,
        numeroInscricao: cpf,
        nome: capitalize(nome),
        endereco,
        cep,
        cidade,
        bairro,
        uf: uf.toUpperCase().trim()
      }
    }
    setLoading(true)
    try {
      const { data } = await api.post("/app/boleto", payload)
      if (!data?.urlImagemBoleto) return
      await WebBrowser.openBrowserAsync(data.urlImagemBoleto)
    } catch (error) {
      toast.error("Erro ao gerar boleto")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoid>
        <View style={bs('container')}>
          <Text style={styles.title}>Preencha os dados para gerar o boleto da matrícula</Text>
          <InputCPF
            value={cpf}
            onChangeText={setCpf}
            style={bs('mb-3')}
          />
          <InputText
            value={nome}
            onChangeText={setNome}
            placeholder='Nome Completo'
            style={bs('mb-3')}
          />
          <InputText
            value={uf}
            onChangeText={setUf}
            placeholder='UF'
            style={bs('mb-3')}
          />
          <InputText
            value={cidade}
            onChangeText={setCidade}
            placeholder='Cidade'
            style={bs('mb-3')}
          />
          <InputText
            value={bairro}
            onChangeText={setBairro}
            placeholder='Bairro'
            style={bs('mb-3')}
          />
          <InputCEP
            value={cep}
            onChangeText={setCep}
            style={bs('mb-3')}
          />
          <InputText
            value={endereco}
            onChangeText={setEndereco}
            placeholder='Endereço'
            style={bs('mb-3')}
          />
          <Btn
            style={bs('mb-5')}
            color={Color.primary}
            onPress={handleBoleto}
            disabled={loading}
          >
            {loading ? 'Gerando...' : 'Gerar Boleto'}
          </Btn>
        </View>
      </KeyboardAvoid>
    </TouchableWithoutFeedback>
  )
}

export default Boleto

const styles = StyleSheet.create({
  title: {
    fontSize: s(16),
    marginTop: vs(10),
    marginBottom: vs(12)
  }
})