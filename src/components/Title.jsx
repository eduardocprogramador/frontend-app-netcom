import { StyleSheet, Text } from 'react-native'
import { vs, s } from 'react-native-size-matters'

const Title = ({ children }) => {
    return (
        <Text style={styles.value}>{children}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    value: {
        fontSize: s(15),
        color: "#111827",
        fontWeight: "500",
        marginBottom: vs(7),
    },
})