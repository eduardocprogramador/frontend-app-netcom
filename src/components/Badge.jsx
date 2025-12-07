import { StyleSheet, Text, View } from 'react-native'
import { vs, s } from 'react-native-size-matters'

const Badge = ({ children, color }) => {
    return (
        <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: color }]}>{children}</Text>
        </View>
    )
}

export default Badge

const styles = StyleSheet.create({
    badge: {
        backgroundColor: "#EFF6FF",
        borderColor: "#DBEAFE",
        borderWidth: s(1),
        paddingVertical: vs(6),
        paddingHorizontal: s(12),
        borderRadius: 999
    },
    badgeText: {
        fontSize: s(14),
        fontWeight: "600"
    }
})