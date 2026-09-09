 import {createSlice}  from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem("user");
const initialState= {
    user: userFromStorage && userFromStorage !== "null" ? JSON.parse(userFromStorage) : null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers : {
        setUser(state, value){
            state.user = value.payload;
        }
    }
})

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;