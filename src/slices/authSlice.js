 import {createSlice}  from '@reduxjs/toolkit';

// localStorage.getItem returns the string "null" when null was stored,
// which is truthy — so we must parse it properly.
const tokenFromStorage = localStorage.getItem("token");
const initialState = {
    token: tokenFromStorage && tokenFromStorage !== "null" ? tokenFromStorage : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers : {
        setToken(state, value){
            state.token = value.payload;
        }
    }
})

export const {setToken} = authSlice.actions;
export default authSlice.reducer;