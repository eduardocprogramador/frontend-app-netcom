import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./reducers/userReducer";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['userData']
}

export const persistedUserReducer = persistReducer(persistConfig, userReducer)