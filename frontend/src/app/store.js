import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../feature/posts.slice";
import userReducer from "../feature/user.slice";

export default configureStore({
    reducer: {
        posts: postsReducer,
        currentUser: userReducer
    }

})