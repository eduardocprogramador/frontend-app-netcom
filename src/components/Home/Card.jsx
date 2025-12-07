import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { vs, s } from 'react-native-size-matters'

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
        <FontAwesome name={icon} size={s(28)} color={color} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: vs(120),
    borderWidth: s(1.5),
    borderRadius: s(12),
    padding: s(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBox: {
    marginBottom: vs(8)
  },
  text: {
    fontSize: s(16),
    fontWeight: '600'
  }
})

export default Card
