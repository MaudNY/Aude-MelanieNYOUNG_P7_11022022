import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setPostsData } from "../feature/posts.slice";

import authApi from "../api/auth";

import SendIcon from '@mui/icons-material/Send';

export default function CreateComment() {
  // Variable
  const { id } = useParams;
  const urlPathName = (new URL(document.location)).pathname;
  const dispatch = useDispatch();
  const commentFormRef = useRef();

  // Get input value
  const inputValues = { content: "" };
  const [formValues, setFormValues] = useState(inputValues);

  // Get JSON object from input value
  const setRequestBody = (e) => {
      const {name, value} = e.target;
      setFormValues({ ...formValues, [name]: value });

      return {...formValues};
  };

  // --- PUBLISH POST --- //

  const publishComment = (e) => {
    e.preventDefault();

    const postId = localStorage.getItem("postId");
    const commentContent = { ...formValues };

    authApi.post(`/comment/${postId}`, commentContent)
        .then(() => {
          commentFormRef.current.reset();

          return authApi.get('/home');
        })
        .then(response => {
          console.log("urlpathname", urlPathName);
          console.log("response.data :", response.data);
          console.log("post.userId", response.data.userId);
          console.log("id params :", id);
          if (urlPathName === `/profil/${id}`) {

            return dispatch(setPostsData(response.data.filter(post => post.userId === id)));
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
        <textarea type="text" name="content" id="content" onChange={ setRequestBody } placeholder="Partagez votre opinion ici..." required />
        <button type="submit" className="comment-button" onClick={ publishComment } ><SendIcon className="comment-icon" /></button>
      </div>
    </form>
  )
}
