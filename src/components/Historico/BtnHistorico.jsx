import { StyleSheet, View } from 'react-native'
import { Btn } from '../../../library/html'
import { Color } from '../../../library/colors'
import * as WebBrowser from "expo-web-browser"
import api from '../../utils/api'
import { vs, s } from 'react-native-size-matters'
import { useSelector } from 'react-redux'

const BtnHistorico = () => {
    const partner_id = useSelector(state => state.userReducer.userData?.partner_id)
    async function handleHistorico() {
        const url = `/app/historico/${partner_id}`
        const fullUrl = api.defaults.baseURL + url
        await WebBrowser.openBrowserAsync(fullUrl)
    }
    return (
        <Btn childrenStyle={{ fontSize: s(10) }} onPress={handleHistorico} color={Color.primary}>Histórico</Btn>
    )
}

export default BtnHistorico

const styles = StyleSheet.create({})