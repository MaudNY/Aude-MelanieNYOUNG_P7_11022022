import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../feature/posts.slice";

export default configureStore({
    reducer: {
        posts: postsReducer,
    }

})