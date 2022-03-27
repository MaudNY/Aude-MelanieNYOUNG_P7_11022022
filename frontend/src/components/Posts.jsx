import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authApi from '../api/auth';

import CreateComment from './CreateComment';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Posts() {

    // --- GET ALL POSTS --- //
    const [ data, setData ] = useState([]);

    useEffect(() => {
        authApi.get('/home')
            .then((res) => {
                console.log("Liste des posts :", res.data);
                
                return setData(res.data);
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
        <div id="homefeed">
            {data.map((post) =>
              <div id={ post.id } key={ post.id } className="post">
                <div className="post-line-one">
                    <div className="post-picture">
                        <img src={ post.User.profileImageUrl } alt={ post.User.firstName + " " + post.User.lastName } />
                    </div>
                    <div className="post-details">
                        <div className="author-details">
                            <div className="author-name">
                                <div className="author-first-name">{ post.User.firstName }</div>
                                <div className="author-last-name">{ post.User.lastName }</div>
                            </div>
                            <div className="author-job">{ post.User.job }</div>
                        </div>
                        <div className="post-date">{ post.createdAt }</div>
                        <button type="button" id={ post.User.id } className="post-actions-btn" onClick={ showOptions }>
                            <i id={ post.id } className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                    </div>
                </div>
                <div className="post-line-two post-content">{ post.content }</div>
                { post.imageUrl ?
                    <div className="post-line-three">
                        <img src={ post.imageUrl } alt={ "image publication " + post.id + " de " + post.User.firstName + " " + post.User.lastName } />
                    </div> : <></>
                }
                <div className="post-line-reactions">
                    <Link to={ `/post/${ post.id }` } >
                        <div className="comment-section">
                            <ChatBubbleOutlineIcon className="comment-icon"/>
                            { post.commentsCount < 2 ?
                            <div className="comment-count">{ post.commentsCount } commentaire</div>
                            : <div className="comment-count">{ post.commentsCount } commentaires</div>
                            }
                        </div>
                    </Link>
                </div>
                <div id={ post.id } className="post-last-line" onClick={ setPostId } >
                    <CreateComment />
                </div>
                { options }
            </div>
          )}
      </div>
    )
}
