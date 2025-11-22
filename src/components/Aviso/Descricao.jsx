import { StyleSheet, Text } from 'react-native'
import { vs, s } from 'react-native-size-matters'

const Descricao = ({ children }) => {
    return (
        <Text style={styles.desc}>{children}</Text>
    )
}

export default Descricao

const styles = StyleSheet.create({
    desc: {
        fontSize: s(14),
        color: "#484860ff",
        marginBottom: vs(2),
        letterSpacing: s(0.2),
    }
})