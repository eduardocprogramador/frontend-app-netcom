import React from "react"
import { View, Text, StyleSheet, Pressable, FlatList, TextInput, Image, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Color } from "./colors"
import { vs, s } from 'react-native-size-matters'
import bs from "./bootstrap"
import { useState, useRef, useMemo } from "react"
import Entypo from '@expo/vector-icons/Entypo'

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
      <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
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
export const InputCPF = ({ value, onChangeText, placeholder = "CPF", style }) => {
  return (
    <TextInput
      style={[styles.formControl, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="number-pad"
      maxLength={11}
    />
  )
}
export const Option = ({ value, label, children }) => null
export const Select = ({ value, onChange, children, placeholder = "Selecione", style, textStyle, optionTextStyle }) => {
  const [open, setOpen] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current
  const toggleOpen = () => {
    const toValue = open ? 0 : 1
    setOpen(!open)
    Animated.timing(rotateAnim, {
      toValue,
      duration: 180,
      useNativeDriver: true
    }).start()
  }
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  })
  const optionElements = React.Children.toArray(children)
  const options = optionElements
    .map((child) => {
      if (!React.isValidElement(child)) return null
      return {
        value: child.props.value,
        label: child.props.children || child.props.label
      }
    })
    .filter(Boolean)
  const selectedLabel = options.find(o => o.value === value)?.label
  return (
    <View style={style}>
      <Pressable
        onPress={toggleOpen}
        style={styles.selectBox}
      >
        <Text style={[styles.selectText, textStyle]}>
          {selectedLabel || placeholder}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Entypo name="chevron-down" size={16} color="#6c757d" />
        </Animated.View>
      </Pressable>
      {open && (
        <View style={styles.options}>
          {options.map(option => (
            <Pressable
              key={option.value}
              onPress={() => {
                onChange(option.value)
                toggleOpen()
              }}
              style={styles.optionItem}
            >
              <Text style={[styles.optionText, optionTextStyle]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}
function normalizeText(text = "") {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
}
export function SelectSearch({
  value,
  onChange,
  options = [],
  placeholder = "",
  style,
  inputStyle,
  optionTextStyle,
  maxVisible = 6,
}) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const selectedLabel = useMemo(() => {
    return options.find(o => o.value === value)?.label || ""
  }, [value, options])

  const inputValue = open ? query : (selectedLabel || query)

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim())
    if (!q) return options
    return options.filter(o => normalizeText(o.label).includes(q))
  }, [query, options])

  function handleSelect(item) {
    onChange?.(item)
    setQuery("")
    setOpen(false)
  }

  return (
    <View style={[style, { position: "relative" }]}>
      <TextInput
        style={[styles.formControl, inputStyle]}
        value={inputValue}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onChangeText={(t) => {
          setQuery(t)
          setOpen(true)
          onChange?.(null)
        }}
      />

      {open && filtered.length > 0 && (
        <View style={[styles.dropdown, { maxHeight: vs(40) * maxVisible }]}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filtered}
            keyExtractor={(item) => String(item.value)}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelect(item)} style={styles.optionItem}>
                <Text style={[styles.optionText, optionTextStyle]}>
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}

      {open && filtered.length === 0 && (
        <View style={styles.dropdown}>
          <Text style={[styles.optionText, { padding: s(10), color: "#6c757d" }]}>
            Nenhuma opção encontrada
          </Text>
        </View>
      )}
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
    fontSize: s(13),
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
  selectBox: {
    width: "100%",
    height: vs(40),
    borderWidth: s(1),
    borderColor: "#ced4da",
    borderRadius: s(6),
    paddingHorizontal: s(10),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  selectText: {
    fontSize: s(14),
    color: "#333"
  },
  options: {
    marginTop: s(4),
    borderWidth: s(1),
    borderColor: "#ced4da",
    borderRadius: s(6),
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  dropdown: {
    position: "absolute",
    top: vs(44),
    left: 0,
    right: 0,
    borderWidth: s(1),
    borderColor: "#ced4da",
    borderRadius: s(6),
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 999,
    elevation: 10,
  },
  optionItem: {
    paddingVertical: vs(10),
    paddingHorizontal: s(10),
  },
  optionText: {
    fontSize: s(14),
    color: "#333"
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