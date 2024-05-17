import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from 'axios';

const initialState = {
    user: localStorage.getItem("user"),
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("user");
            try {
                axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, {
                    withCredentials: "true"
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
})

export const {
    login,
    logout
} = userSlice.actions;

export default userSlice.reducer;