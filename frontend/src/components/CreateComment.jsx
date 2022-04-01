import React, { useState } from "react";
import authApi from "../api/auth";
import SendIcon from '@mui/icons-material/Send';

export default function CreateComment() {
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

          return window.location.reload(false);
        })
        .catch(error => {
            
            console.log(error);
        })
  };

  return (
    <div className="create-comment">
      <div className="comment-upper-bar">
        <div className="comment-picture">
            <img src={ localStorage.getItem("profileImageUrl") } alt="utilisateur connecté" />
        </div>
        <textarea type="text" name="content" id="content" onChange={ setRequestBody } placeholder="Partagez votre opinion ici..." required />
        <button type="submit" className="comment-button" onClick={ publishComment } ><SendIcon className="comment-icon" /></button>
      </div>
      <div className="comment-lower-bar">
        <div className="comment-splitter"></div>
      </div>
    </div>
  )
}
