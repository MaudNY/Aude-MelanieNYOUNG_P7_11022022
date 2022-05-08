import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setPostsData } from "../feature/posts.slice";

import authApi from "../api/auth";

import SendIcon from '@mui/icons-material/Send';

export default function CreateComment() {
  // Variables
  const id = useParams().id;
  const urlPathName = (new URL(document.location)).pathname;
  const dispatch = useDispatch();
  const commentFormRef = useRef();
  const inputComment = useRef();

  // --- PUBLISH COMMENT --- //

  const publishComment = (e) => {
    e.preventDefault();

    const postId = localStorage.getItem("postId");
    const commentContent = {
      content: inputComment.current.value
    };

    authApi.post(`/comment/${postId}`, commentContent)
        .then(() => {
          commentFormRef.current.reset();

          return authApi.get('/home');
        })
        .then(response => {
          
          if (urlPathName === `/profil/${id}`) {

            return dispatch(setPostsData(response.data.filter(post => post.userId === parseFloat(id))));
          } else {
  
            return dispatch(setPostsData(response.data));
          }

        })
        .catch(error => {
          console.log(error);
        })
  };

  return (
    <form method="post" className="create-comment" ref={ commentFormRef }>
      <div className="comment-upper-bar">
        { localStorage.getItem("profileImageUrl") === null || localStorage.getItem("profileImageUrl") === "" || localStorage.getItem("profileImageUrl") === "null"
        ?
        <div className="comment-picture">
            <img src="../assets/default-profile-pic.jpg" alt="utilisateur connecté" />
        </div>
        :
        <div className="comment-picture">
            <img src={ localStorage.getItem("profileImageUrl") } alt="utilisateur connecté" />
        </div>
        }
        <textarea type="text" name="content" id="content" ref={ inputComment } placeholder="Partagez votre opinion ici..." required />
        <button type="submit" className="comment-button" onClick={ publishComment } ><SendIcon className="comment-icon" /></button>
      </div>
    </form>
  )
}