import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const Card = ({ text, icon, color, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      style={[
        styles.card,
        { borderColor: color, opacity: disabled ? 0.4 : 1 }
      ]}
    >
      <View style={styles.iconBox}>
        <FontAwesome name={icon} size={28} color={color} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBox: {
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  }
})

export default Card
