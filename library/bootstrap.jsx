import { StyleSheet } from "react-native"
import { Color } from "./colors"
import { vs, s } from 'react-native-size-matters'

const TOTAL_COLUMNS = 12
const GUTTER = s(8)
const colWidth = (span) => `${(span / TOTAL_COLUMNS) * 100}%`

const bootstrapStyles = () => {
  const styles = {}
  const spacings = [1, 2, 3, 4, 5]
  const spacingValues = {1: 6, 2: 12, 3: 18, 4: 24, 5: 30}
  spacings.forEach((num) => {
    const v = spacingValues[num]
    styles[`mt-${num}`] = { marginTop: vs(v) }
    styles[`mb-${num}`] = { marginBottom: vs(v) }
    styles[`ms-${num}`] = { marginLeft: s(v) }
    styles[`me-${num}`] = { marginRight: s(v) }
    styles[`mx-${num}`] = { marginHorizontal: s(v) }
    styles[`my-${num}`] = { marginVertical: vs(v) }
    styles[`m-${num}`] = { margin: s(v) }
    styles[`pt-${num}`] = { paddingTop: vs(v) }
    styles[`pb-${num}`] = { paddingBottom: vs(v) }
    styles[`ps-${num}`] = { paddingLeft: s(v) }
    styles[`pe-${num}`] = { paddingRight: s(v) }
    styles[`px-${num}`] = { paddingHorizontal: s(v) }
    styles[`py-${num}`] = { paddingVertical: vs(v) }
    styles[`p-${num}`]  = { padding: s(v) }
  })
  styles['ms-auto'] = { marginLeft: 'auto' }
  styles['me-auto'] = { marginRight: 'auto' }
  styles["container"] = {
    flex: 1,
    width: "100%",
    paddingHorizontal: s(16), 
    marginLeft: "auto",
    marginRight: "auto"
  }
  styles["bg-primary"] = { backgroundColor: Color.primary }
  styles["bg-success"] = { backgroundColor: Color.success }
  styles["bg-warning"] = { backgroundColor: Color.warning }
  styles["bg-danger"] = { backgroundColor: Color.danger }
  styles["bg-light"] = { backgroundColor: Color.light }
  styles["bg-dark"] = { backgroundColor: Color.dark }
  styles["text-light"] = { color: Color.light }
  styles["fw-bold"] = { fontWeight: "bold" }
  styles["border"] = { 
    borderWidth: s(1), 
    borderColor: "#dee2e6" 
  }
  styles["rounded"] = { borderRadius: s(8) }
  styles["rounded-circle"] = {
    borderRadius: 9999, 
    overflow: "hidden", 
  }
  styles['w-25'] = { width: '25%' }
  styles['w-50'] = { width: '50%' }
  styles['w-75'] = { width: '75%' }
  styles['w-100'] = { width: '100%' }
  styles["text-center"] = { textAlign: "center" }
  styles["text-end"] = { textAlign: "right" }
  styles["justify-content-center"] = { justifyContent: "center" }
  styles["justify-content-between"] = { justifyContent: "space-between" }
  styles["justify-content-around"] = { justifyContent: "space-around" }
  styles["justify-content-end"] = { justifyContent: "flex-end" }
  styles["align-items-center"] = { alignItems: "center" }
  styles["align-items-end"] = { alignItems: "flex-end" }
  styles["d-flex"] = { 
    display: "flex", 
    flexDirection: "row" 
  }
  styles["d-none"] = { display: "none" }
  styles["d-block"] = { display: "flex" }
  styles["position-absolute"] = { position: "absolute" }
  styles["row"] = {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -GUTTER,
    marginRight: -GUTTER,
  }
  for (let i = 1; i <= TOTAL_COLUMNS; i++) {
    styles[`col-${i}`] = { width: colWidth(i), paddingLeft: GUTTER, paddingRight: GUTTER }
    styles[`offset-${i}`] = { marginLeft: colWidth(i) }
  }
  styles["center"] = {
    justifyContent: "center",
    alignItems: "center"
  }
  styles["flex-1"] = { flex: 1 }
  styles["elevation"] = {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  }
  return styles
}

const styles = StyleSheet.create(bootstrapStyles())
const bs = (...classNames) => {
  return classNames.flat().map((name) => styles[name]).filter(Boolean)
}
export default bs
