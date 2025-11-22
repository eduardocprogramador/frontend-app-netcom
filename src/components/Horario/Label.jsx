import { StyleSheet, Text } from 'react-native'
import { vs, s } from 'react-native-size-matters'

const Label = ({ children }) => {
    return (
        <Text style={styles.label}>{children}</Text>
    )
}

export default Label

const styles = StyleSheet.create({
    label: {
        fontSize: s(12),
        color: "#6B7280",
        marginBottom: vs(2),
        letterSpacing: s(0.2),
    }
})