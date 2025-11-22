import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const KeyboardAvoid = ({ children }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >{children}</ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoid
