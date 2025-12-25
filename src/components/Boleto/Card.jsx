import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { s } from "react-native-size-matters"
import bs from "../../../library/bootstrap"
import Badge from "../Badge"
import Label from "../Label"
import Title from "../Title"
import { toast } from "../../utils/toast"
import Feather from '@expo/vector-icons/Feather';
import * as Clipboard from 'expo-clipboard'

const Card = ({ status, vencimento, valor, linhaDigitavel, pagador, style }) => {
  async function copiarLinhaDigitavel() {
    await Clipboard.setStringAsync(linhaDigitavel)
    toast.success("Linha digitável copiada")
  }
  return (
    <View style={[bs("container", "elevation"), styles.card, style]}>
      <View style={bs("row", "justify-content-around", "mb-2")}>
        <Badge color={status === "PAGO" ? "#1D4ED8" : "#16A34A"}>
          {status}
        </Badge>
        <Badge color="#3e455bff">Venc. {vencimento}</Badge>
      </View>
      <View style={bs("mb-2")}>
        <Label>Valor</Label>
        <Title numberOfLines={1}>R$ {valor},00</Title>
      </View>
      {status == "ABERTO" && (
        <>
          <View style={bs("mb-1")}>
            <Label>Linha digitável</Label>
            <Title numberOfLines={2}>{linhaDigitavel}</Title>
          </View>
          <View style={bs("mb-2")}>
            <TouchableOpacity onPress={copiarLinhaDigitavel}>
              <Text>
                <Feather name="copy" size={s(17)} color="black" /> Copiar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View>
        <Label>Pagador</Label>
        <Title numberOfLines={1}>{pagador}</Title>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: s(16),
    padding: s(15),
  },
})
