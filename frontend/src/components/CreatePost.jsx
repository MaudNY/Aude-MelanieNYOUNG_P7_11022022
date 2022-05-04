import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setPostsData } from "../feature/posts.slice";

import authApi from "../api/auth";

import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CreatePost() {
  // Variables
  const formRef = useRef();
  const inputText = useRef();
  const dispatch = useDispatch();

  // --- SET FILE PREVIEW --- //

  // Store file & preview in state
  const [ image, setImage ] = useState();
  const [ preview, setPreview ] = useState();

  // Get post file details
  const previewFile = (e) => {
    const file = e.target.files[0];
    

    if (file) {
      setImage(file && file.type.substr(0, 5) === "image");
    } else {
      setImage(null);
    }
  };

  // Display file preview
  useEffect(() => {

    if (image) {
      const file = document.querySelector("#file").files[0];
      console.log("Fichier en PREVIEW = ", file);

      const reader = new FileReader(file);
      reader.onloadend = () => {
        setPreview(
          <div id="preview-post-file">
            <img src={ reader.result } alt="preview" />
            <IconButton className="cancel-file-button" onClick={ () => { setImage() } }>
              <CancelIcon />
            </IconButton>
          </div>
        );
      }
      reader.readAsDataURL(file);
      
    } else {
      setPreview(null);
    }

  }, [image]);


  // --- PUBLISH POST --- //
  const [ error, setError ] = useState(false);

  const publishPost = (e) => {
    e.preventDefault();

    const postDetails = inputText.current.value;
    const file = document.querySelector('input[type="file"]').files[0];

    let formData = new FormData();
    formData.append("content", postDetails);
    formData.append("image", file);

    authApi.post('/createpost', formData)
      .then(res => {
        setPreview(null);
        setImage(null);
        setError(false);
        formRef.current.reset();
          
        return console.log(res.data);
      })
      .then(() => {
        
        return authApi.get('/home');
      })
      .then (response => {

        return dispatch(setPostsData(response.data));
      })
      .catch(error => {
        setError(true);
        console.log(error.response.data);
      })
  };

  return (
      <div className='create-post'>

        <NavLink to={ `/profil/${ localStorage.getItem("userId") }` } className="nav-link">
          { localStorage.getItem("profileImageUrl") === null || localStorage.getItem("profileImageUrl") === "" || localStorage.getItem("profileImageUrl") === "null"
          ?
          <div className="post-author-pic">
            <img src="../assets/default-profile-pic.jpg" alt="utilisateur connecté" />
          </div>
          :
          <div className="post-author-pic">
            <img src={ localStorage.getItem("profileImageUrl") } alt="utilisateur connecté" />
          </div>
          }
        </NavLink>  
        <form id="post-form" method="post" encType="multipart/form-data" ref={ formRef }>
          <textarea type="text" name="content" id="content" ref={ inputText } placeholder="Que souhaitez-vous partager aujourd'hui ?" autoComplete="off" minLength={ 1 } required />
          <div className="post-splitter"></div>
          { preview }
          <div className="post-submit-bar">
            { error === true && (
              <div id="error-publish-post">Le contenu de votre post ne peut pas être vide <span>&#128519;</span></div>
            )}
            <input type="file" name="file" id="file" accept="image/*" onChange={ previewFile } />
            <label htmlFor="file"><AddPhotoAlternateRoundedIcon className='post-img-icon' /></label>
            <button type="submit" className="publish-button" onClick={ publishPost } >Publier</button>
          </div>
        </form>
      </div>
    )
}