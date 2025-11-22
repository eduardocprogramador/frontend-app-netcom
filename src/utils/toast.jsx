import Toast from 'react-native-toast-message'
import { s } from 'react-native-size-matters'

const FONTE = s(13)

export const toast = {
  success: (title) =>
    Toast.show({ type: 'success', text1: title, text1Style: { fontSize: FONTE } }),
  error: (title) =>
    Toast.show({ type: 'error', text1: title, text1Style: { fontSize: FONTE } }),
  info: (title) =>
    Toast.show({ type: 'info', text1: title, text1Style: { fontSize: FONTE } })
}