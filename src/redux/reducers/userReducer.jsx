import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null
}

export const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const { setUserData } = userReducer.actions
export default userReducer.reducer