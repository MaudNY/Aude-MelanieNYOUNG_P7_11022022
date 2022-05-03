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
        },
        // Function that adds a post
        addPost: (state, { payload }) => {
            state.posts.push(payload);
        }
    }
})

export default postsSlice.reducer;
export const { setPostsData, addPost } = postsSlice.actions;