import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "currentUser",
    initialState: {
        currentUser: null,
    },
    reducers: {
        // Function that seeks data
        setCurrentUserData: (state, { payload }) => {
            state.currentUser = payload;
        }
    }
})

export default userSlice.reducer;
export const { setCurrentUserData } = userSlice.actions;