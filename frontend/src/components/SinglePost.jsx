import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateComment from './CreateComment';
import authApi from '../api/auth';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function SinglePost() {
  // --- GET ONE SINGLE POST --- //
  const [ post, setPost ] = useState();

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    console.log("Chemin de l'URL :", pathArray);
    const postId = pathArray[2];
    console.log("post ID :", postId);

    authApi.get(`/post/${postId}`)
        .then((res) => {
            setPost(res.data);
            
            return console.log("Post à afficher :", res.data);
        })
        .catch(error => {
            
            console.log(error);
        })

  }, []);

  // SET POST ID in Local Storage
  const setPostId = (e) => {
    const postId = e.target.parentElement.parentElement.parentElement.id;
    
    return localStorage.setItem("postId", postId);
};

// --- SHOW PUT AND DELETE OPTIONS --- //

  const [ options, setOptions ] = useState();

    const showOptions = (e) => {
        const postId = e.target.id;
        console.log("ID du post cliqué :", postId);

        const author = e.target.parentElement.id;
        console.log("ID de l'auteur :", author);

        const $targetedPost = document.getElementById(postId);
        console.log("Post cible :", $targetedPost);

        const user = localStorage.getItem("userId");
        console.log("Id de l'utilisateur :", user);

        $targetedPost.classList.add("clicked")

        if ($targetedPost) {

            setOptions(
                <div className="post-options">
                    <div className="option-modify">Modifier</div>
                    <div className="options-splitter"></div>
                    <div className="option-delete">Supprimer</div>
                </div>
            )
        }
    };

  return (
    <main className="main-container single-post">
      <Link to={ "/home" }>
        <button type="button" className="btn-back-home"><ArrowBackIcon /></button>
      </Link>
    </main>
  )
}
