import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null,
    },
    reducers: {
        // Function that seeks data
        setPostsData: (state, { payload }) => {
            state.posts = payload;
        }
    }
})

export default postsSlice.reducer;
export const { setPostsData, addPost } = postsSlice.actions;