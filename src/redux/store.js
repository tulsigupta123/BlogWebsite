import {createSlice,configureStore} from '@reduxjs/toolkit'

// Creating slices-
const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLogin:false
    },
    reducers:{
        login(state){
            state.isLogin = true
        },
        logout(state){
            state.isLogin = false
        }
    }
})

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
})