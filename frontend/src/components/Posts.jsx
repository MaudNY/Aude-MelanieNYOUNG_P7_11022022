import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authApi from '../api/auth';

import CreateComment from './CreateComment';

import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Posts() {

    // Variables
    const userId = localStorage.getItem("userId");
    const $clicked = document.querySelector(".clicked");
    const $updating = document.querySelector(".updating");
    const $deleting = document.querySelector(".deleting");

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
        const postId = e.target.parentElement.parentElement.parentElement.parentElement.id;
        
        return localStorage.setItem("postId", postId);
    };

    // --- SHOW POST OPTIONS --- //
    const [ clicked, setClicked ] = useState(false);

    // Define if the post is either clicked or not
    const showOptions = (e) => {
        const $currentClickedPost = document.querySelector(".clicked");

        if ($currentClickedPost) {
            $currentClickedPost.classList.remove("clicked")
        }

        const postId = e.target.parentElement.parentElement.parentElement.parentElement.id;
        const $targetedPost = document.getElementById(postId);

        $targetedPost.classList.add("clicked");

        return setClicked(!clicked);
    };

    // Clear post options
    const clearPostOptions = (e) => {
        e.preventDefault();

        if (!e.target.classList.contains("post-actions-icon")) {
            setClicked(false);
        }
    };

    // --- UPDATE A POST --- //
    const [ isUpdated, setIsUpdated ] = useState(false);

    // Get input values
    const inputValues = { content: "", imageUrl: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from input values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });

        console.log({ ...formValues });

        return {...formValues};
    };

    const showUpdateForm = (e) => {
        e.preventDefault();

        const $currentUpdatingPost = document.querySelector(".updating");

        if ($currentUpdatingPost) {
            $currentUpdatingPost.classList.remove("updating")
        }

        const postId = e.target.parentElement.parentElement.id;
        const $targetedPost = document.getElementById(postId);

        $targetedPost.classList.add("updating");

        return setIsUpdated(true);

    };

    // DELETE A POST
    const [ deletionAlert, setDeletionAlert ] = useState(false);

    const showDeletionAlert= (e) => {
        e.preventDefault();

        const $currentPostToBeDeleted = document.querySelector(".deleting");

        if ($currentPostToBeDeleted) {
            $currentPostToBeDeleted.classList.remove("deleting")
        }

        const postId = e.target.parentElement.parentElement.id;
        const $targetedPost = document.getElementById(postId);

        $targetedPost.classList.add("deleting");

        return setDeletionAlert(true);
    };

    const clearDeletionAlert = (e) => {
        e.preventDefault();

        const $postMeantToBeDeleted = document.querySelector(".deleting");
        $postMeantToBeDeleted.classList.remove("deleting");

        return setDeletionAlert(!deletionAlert);
    };

    const deletePost = (e) => {
        e.preventDefault();

        const postId = $deleting.id;

        authApi.delete(`/deletepost/${postId}`)
            .then(() => {

                return window.location.reload(false);
            })
            .catch(error => {
            
                console.log(error);
            })
    };

    return (
        <div id="homefeed" onClick={ clearPostOptions }>
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
                        { userId == post.User.id || localStorage.getItem("role") === "moderator"
                        ? <button id={ post.id } type="button" className="post-actions-btn" onClick={ showOptions }>
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        :
                        <button type="button" className="post-actions-btn">
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        }
                    </div>
                </div>
                { isUpdated === true && $updating && $updating.id == post.id
                ? 
                <div className="post-line-two post-textarea">
                    <textarea defaultValue={ post.content } onChange={ setRequestBody }></textarea>
                    <div className="update-btn-container">
                        <button type="submit" className="update-button">Enregistrer</button>
                    </div> 
                </div>
                : <div className="post-line-two post-content">{ post.content }</div>
                }
                { post.imageUrl
                ?
                <div className="post-line-three">
                    <img src={ post.imageUrl } alt={ "image publication " + post.id + " de " + post.User.firstName + " " + post.User.lastName } />
                </div>
                : <></>
                }
                <div className="post-line-reactions">
                    <Link to={ `/post/${ post.id }` } >
                        <div className="comment-section">
                            <ChatBubbleOutlineIcon className="comment-icon"/>
                            { post.commentsCount < 2
                            ? <div className="comment-count">{ post.commentsCount } commentaire</div>
                            : <div className="comment-count">{ post.commentsCount } commentaires</div>
                            }
                        </div>
                    </Link>
                </div>
                <div className="post-last-line" onClick={ setPostId } >
                    <CreateComment />
                </div>
                {clicked === true && $clicked && $clicked.id == post.id && post.User.id == userId
                ?
                <div id="post-options">
                    <button type="button" className="option-modify" onClick={ showUpdateForm }>Modifier</button>
                    <div className="options-splitter"></div>
                    <button type="button" className="option-delete" onClick={ showDeletionAlert }>Supprimer</button>
                </div>
                : <></>
                }
                {clicked === true && $clicked && $clicked.id == post.id && localStorage.getItem("role") === "moderator" && post.User.id != userId
                ?
                <div id="post-options">
                    <button type="button" className="option-delete" onClick={ showDeletionAlert }>Supprimer</button>
                </div>
                : <></>
                }
                {deletionAlert === true && $deleting && $deleting.id == post.id
                ?
                <div id={ post.id } className="deletion-alert">
                    <IconButton className="cancel-deletion-button" onClick={ clearDeletionAlert }>
                        <CancelIcon />
                    </IconButton>
                    <div className="deletion-text">Souhaitez-vous vraiment supprimer cette publication ?</div>
                    <div>
                        <button type="button" className="deletion-button" onClick={ deletePost }>Supprimer</button>
                    </div>
                </div>
                : <></>
                }
            </div>
          )}
      </div>
    )
}
