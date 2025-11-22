import { View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Color } from "./colors"
import { vs, s } from 'react-native-size-matters'
import bs from "./bootstrap"
import { Picker } from "@react-native-picker/picker"

export const H1 = ({ children, style }) => {
  return <Text style={[styles.h1, style]}>{children}</Text>
}
export const H2 = ({ children, style }) => {
  return <Text style={[styles.h2, style]}>{children}</Text>
}
export const H3 = ({ children, style }) => {
  return <Text style={[styles.h3, style]}>{children}</Text>
}
export const H4 = ({ children, style }) => {
  return <Text style={[styles.h4, style]}>{children}</Text>
}
export const H5 = ({ children, style }) => {
  return <Text style={[styles.h5, style]}>{children}</Text>
}
export const H6 = ({ children, style }) => {
  return <Text style={[styles.h6, style]}>{children}</Text>
}
export const P = ({ children, style }) => {
  return <Text style={[styles.p, style]}>{children}</Text>
}
export const Btn = ({ children, color, onPress, style, childrenStyle, disabled = false }) => {
  return (
    <View style={bs('w-100')}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.btn, style, 
          { backgroundColor: color, opacity: disabled ? 0.5 : 1 }
        ]}>
          <Text style={[styles.btnText, childrenStyle]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}
export const A = ({ children, to, style }) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.replace(to)}>
      <Text style={[styles.link, style]}>{children}</Text>
    </Pressable>
  )
}
export const InputText = ({ value, onChangeText, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.formControl, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
    />
  )
}
export const InputPassword = ({ value, onChangeText, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.formControl, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={true}
    />
  )
}
export const InputNumber = ({ value, onChangeText, maxLength, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.formControl, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="number-pad"
      maxLength={maxLength}
    />
  )
}
export const TextArea = ({ value, onChangeText, rows, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.formControl, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={true}
      numberOfLines={rows}
      textAlignVertical="top"
      autoCapitalize="none"
      autoCorrect={false}
    />
  )
}
export const Option = ({ value, label, children }) => null
export const Select = ({ children, value, onValueChange, placeholder = "Selecione", style }) => {
  const options = React.Children.toArray(children).filter(child => child.type === Option)
  return (
    <View style={[styles.formControl, style]}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.select}
        dropdownIconColor="#6c757d"
      >
        {!value && (
          <Picker.Item
            label={placeholder}
            value=""
            color="#6c757d"
          />
        )}
        {options.map((child) => (
          <Picker.Item
            key={child.props.value}
            label={child.props.children}
            value={child.props.value}
          />
        ))}
      </Picker>
    </View>
  )
}
export const Img = ({ src, style }) => {
  return <Image source={src} style={[styles.imgFluid, style]} />
}
export const Label = ({ children, style }) => {
  return <Text style={[styles.label, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  h1: {
    fontSize: s(26),
    fontWeight: 900,
  },
  h2: {
    fontSize: s(24),
    fontWeight: 800,
  },
  h3: {
    fontSize: s(22),
    fontWeight: 700,
  },
  h4: {
    fontSize: s(20),
    fontWeight: 600,
  },
  h5: {
    fontSize: s(18),
    fontWeight: 500,
  },
  h6: {
    fontSize: s(16),
    fontWeight: 500,
  },
  p: {
    fontSize: s(14),
  },
  btn: {
    paddingVertical: vs(10),
    borderRadius: s(6),
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: s(14),
    fontWeight: "bold"
  },
  pressed: {
    opacity: 0.8
  },
  link: {
    textDecorationLine: "none",
    fontWeight: "bold",
    fontSize: s(14),
    color: Color.blue
  },
  formControl: {
    width: '100%',
    height: vs(40),
    borderColor: "#ced4da",
    borderWidth: s(1),
    borderRadius: s(6),
    paddingHorizontal: s(10),
    fontSize: s(14),
    backgroundColor: "#fff",
  },
  select: {
    width: "100%",
    height: "100%",
    fontSize: s(14),
    fontWeight: 500,
  },
  imgFluid: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  label: {
    marginBottom: vs(4),
    fontSize: s(14)
  }
})