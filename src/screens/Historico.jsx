import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useState } from 'react'
import { getHistoricoByCpf } from '../utils/getHistoricoByCpf'
import bs from '../../library/bootstrap'
import { InputCPF } from '../../library/html'
import { Btn } from '../../library/html'
import { Color } from '../../library/colors'
import { s } from 'react-native-size-matters'
import KeyboardAvoid from '../components/KeyboardAvoid'

const Historico = () => {
    const [cpf, setCpf] = useState("")
    return (
        <KeyboardAvoid>
            <View style={bs('container', 'center')}>
                <View style={bs('row')}>
                    <View style={bs('flex-1')}>
                        <InputCPF value={cpf} onChangeText={setCpf} placeholder="Digite o CPF do aluno" />
                    </View>
                    <View>
                        <Btn
                            color={Color.primary}
                            style={bs('px-2')}
                            onPress={() => getHistoricoByCpf(cpf)}
                            disabled={cpf.length < 11}
                        >
                            <FontAwesome name="search" size={s(16)} color="white" />
                        </Btn>
                    </View>
                </View>
            </View>
        </KeyboardAvoid>
    )
}

export default Historico

const styles = StyleSheet.create({})