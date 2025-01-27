import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../feature/posts.slice";

import authApi from '../api/auth';

import CreateComment from './CreateComment';
import Comments from "./Comments";

import { IconButton } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Posts() {

    // Variables
    const { id } = useParams();
    const urlPathName = (new URL(document.location)).pathname;
    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.posts.posts);
    const userId = localStorage.getItem("userId");
    const $clicked = document.querySelector(".clicked");
    const $updating = document.querySelector(".updating");
    const $deleting = document.querySelector(".deleting");

    // --- GET ALL POSTS --- //

    useEffect(() => {

        authApi.get('/home')
            .then(res => {
                if (urlPathName === `/profil/${id}`) {

                    return dispatch(setPostsData(res.data.filter(post => post.userId === parseFloat(id))));
                } else {
                    
                    return dispatch(setPostsData(res.data));
                }
            })
            .catch(error => {
                    
                console.log(error);
            })

    }, [id, dispatch, urlPathName]);

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

        if (!e.target.classList.contains("post-actions-icon")) {
            return setClicked(false);
        }
    };

    // --- SET FILE PREVIEW --- //

    // Get input values
    const inputValues = { content: "", imageUrl: "" };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from input values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });

        return {...formValues};
    };

    // Store file & preview in state
    const [ image, setImage ] = useState();
    const [ preview, setPreview ] = useState(null);

    // Get post file details
    const previewFile = (e) => {
        setRequestBody(e);
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
            const file = document.querySelector("#updated-file").files[0];
            console.log("Fichier en PREVIEW = ", file);

            const reader = new FileReader(file);
            reader.onloadend = () => {
                setPreview(
                <div id="preview-updated-file">
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

    // --- UPDATE A POST --- //
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ newContent, setNewContent ] = useState();
    const [ currentImageDeletion, setCurrentImageDeletion ] = useState(false);

    const showUpdateForm = (e) => {
        e.preventDefault();

        const $currentUpdatingPost = document.querySelector(".updating");

        if ($currentUpdatingPost) {
            $currentUpdatingPost.classList.remove("updating")
        }

        const postId = e.target.parentElement.parentElement.id;
        const $targetedPost = document.getElementById(postId);
        $targetedPost.classList.add("updating");

        localStorage.setItem("postId", postId);

        return setIsUpdated(true);

    };

    const cancelPostUpdate = (e) => {
        setCurrentImageDeletion(false);
        setIsUpdated(false);
    }

    const publishUpdatedPost = (e) => {
        e.preventDefault();
        const newFile = document.querySelector("#updated-file").files[0];
        const postId = localStorage.getItem("postId");

        let formData = new FormData();

        if (newContent === undefined && !newFile && currentImageDeletion === false) {

            return setIsUpdated(false);
        } else if (newContent === undefined && !newFile && currentImageDeletion === true) {
            formData.append("imageUrl", "");

        } else if (newContent === undefined && newFile) {
            setCurrentImageDeletion(false);
            formData.append("image", newFile);

        } else if (!newFile && currentImageDeletion === false) {
            formData.append("content", newContent);

        } else if (newContent !== undefined && currentImageDeletion === true) {
            formData.append("content", newContent);
            formData.append("imageUrl", "");

        } else if (newContent !== undefined && !newFile) {
            formData.append("content", newContent);

        } else {
            setCurrentImageDeletion(false);
            formData.append("content", newContent);
            formData.append("image", newFile);
        }

        return authApi.put(`updatepost/${postId}`, formData)
            .then(() => {
                setIsUpdated(false);

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

    // DELETE A POST
    const [ deletionAlert, setDeletionAlert ] = useState(false);

    const showDeletionAlert = (e) => {
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
                setDeletionAlert(false);

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
                
                if (error.response.status === 404) {
                    console.log(error.response);
                    setDeletionAlert(false);

                    return setPostDeletionErrorAlert(true);
                } else {
                    console.log(error.response);
                }
            })
    };

    // HANDLE DELETION OF NON-EXISTING POST
    const [ postDeletionErrorAlert, setPostDeletionErrorAlert ] = useState(false);

    const refreshPage = (e) => {
        e.preventDefault();
        setPostDeletionErrorAlert(false);

        return window.location.reload(false);
    };

    // SHOW COMMENTS UNDER THE POST
    const [ showComments, setShowComments ] = useState(-1);

    const showCommentsList = (e, post) => {
        const $targetedPost = document.getElementById(post.id);
        $targetedPost.classList.add("clicked-for-comments");
        

        if ($targetedPost.classList.contains("clicked-for-comments") === true) {
            
            return setShowComments(post.id);
        } else {
            
            return setShowComments(-1);
        }

    };

    return (
        <div id="homefeed" onClick={ clearPostOptions }>
            {postsData?.map((post) =>
              <div id={ post.id } key={ post.id } className="post">
                <div className="post-line-one">
                    <NavLink to={ `/profil/${ post.User.id }` } className="nav-link">
                        { post.User.profileImageUrl === null || post.User.profileImageUrl === "" || post.User.profileImageUrl === "null"
                        ?
                        <div className="post-picture">
                            <img src="../assets/default-profile-pic.jpg" alt={ post.User.firstName + " " + post.User.lastName } />
                        </div>
                        :
                        <div className="post-picture">
                            <img src={ post.User.profileImageUrl } alt={ post.User.firstName + " " + post.User.lastName } />
                        </div>
                        }
                    </NavLink>
                    <div className="post-details">
                        <NavLink to={ `/profil/${ post.User.id }` } className="nav-link">
                            <div className="author-details">
                                <div className="author-name">
                                    <div className="author-first-name">{ post.User.firstName }</div>
                                    <div className="author-last-name">{ post.User.lastName }</div>
                                </div>
                                { post.User.job === null || post.User.job === "null" || post.User.job === ""
                                ? <div className="author-job"></div>
                                : <div className="author-job">{ post.User.job }</div>
                                }
                            </div>
                        </NavLink>
                        <div className="post-date">{ post.createdAt }</div>
                        { parseFloat(userId) === post.User.id || localStorage.getItem("role") === "moderator"
                        ? <button type="button" className="post-actions-btn" onClick={ showOptions }>
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        : <></>
                        }
                    </div>
                </div>
                { post.createdAt !== post.updatedAt && (
                    <div className="post-updated-mention">(Modifié)</div>
                ) }
                { isUpdated === true && $updating && parseFloat($updating.id) === post.id
                ? 
                <form id="update-form" className="post-line-two post-textarea" method="post" encType="multipart/form-data">
                      <textarea defaultValue={ post.content } type="text" name="content" id="content" onChange={ (e) => setNewContent(e.target.value) }></textarea>
                      <div className="update-submit-bar">
                        <input type="file" name="updated-file" id="updated-file" accept="image/*" onChange={ previewFile } />
                        <label htmlFor="updated-file"><AddPhotoAlternateRoundedIcon className='post-img-icon' /></label>
                        <button type="button" className="update-button" onClick={ publishUpdatedPost }>Enregistrer</button>
                        <IconButton onClick={ cancelPostUpdate }>
                            <CancelIcon />
                        </IconButton>
                    </div>
                    {preview !== null && (preview)}
                </form>
                : <div className="post-line-two post-content">{ post.content }</div>
                }
                { post.imageUrl && preview === null && isUpdated === true && currentImageDeletion === false
                ?
                <div className="post-line-three">
                    <IconButton className="delete-current-image-btn" onClick={ (e) => setCurrentImageDeletion(true) }>
                        <CancelIcon />
                    </IconButton>
                    <img src={ post.imageUrl } alt={ "image publication " + post.id + " de " + post.User.firstName + " " + post.User.lastName } />
                </div>
                : <></>
                }
                { post.imageUrl && isUpdated === false && currentImageDeletion === false
                ?
                <div className="post-line-three">
                    <img src={ post.imageUrl } alt={ "image publication " + post.id + " de " + post.User.firstName + " " + post.User.lastName } />
                </div>
                : <></>
                }
                <div id={ "commentaires-post-" + post.id } className="post-line-reactions">
                    <div className="comment-section" onClick={ (e) => {
                        showCommentsList(e, post)
                    } }>
                        <ChatBubbleOutlineIcon className="comment-icon"/>
                        { post.commentsCount < 2
                        ? <div className="comment-count">{ post.commentsCount } commentaire</div>
                        : <div className="comment-count">{ post.commentsCount } commentaires</div>
                        }
                    </div>
                </div>
                <div className="post-upper-bar">
                    <div className="comment-splitter"></div>
                </div>
                <div className="post-last-line" onClick={ setPostId } >
                    <CreateComment />
                </div>
                {clicked === true && $clicked && parseFloat($clicked.id) === post.id && post.User.id === parseFloat(userId)
                ?
                <div id="post-options">
                    <button type="button" className="option-modify" onClick={ showUpdateForm }>Modifier</button>
                    <div className="options-splitter"></div>
                    <button type="button" className="option-delete" onClick={ showDeletionAlert }>Supprimer</button>
                </div>
                : <></>
                }
                {clicked === true && $clicked && parseFloat($clicked.id) === post.id && localStorage.getItem("role") === "moderator" && post.User.id !== parseFloat(userId)
                ?
                <div id="post-options">
                    <button type="button" className="option-delete" onClick={ showDeletionAlert }>Supprimer</button>
                </div>
                : <></>
                }
                {deletionAlert === true && $deleting && parseFloat($deleting.id) === post.id
                ?
                <div id={ "deletion-alert-post-" + post.id } className="deletion-alert">
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
                {postDeletionErrorAlert === true && $deleting && parseFloat($deleting.id) === post.id
                ?
                <div id={ "error-deletion-alert-post-" + post.id } className="deletion-alert">
                    <div className="error-deletion-text">
                        Oups !<br />
                        Il semblerait que ce post n'existe déjà plus... <span>&#128517;</span></div>
                    <div>
                        <button type="button" className="refresh-button" onClick={ refreshPage }>C'est noté !</button>
                    </div>
                </div>
                : <></>
                }
                { post.id === showComments && post.commentsCount !== 0
                ? <Comments post={ post } />
                : <></>
                }
            </div>
          )}
      </div>
    )
}
