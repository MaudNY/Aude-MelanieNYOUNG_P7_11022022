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

    // GET USER Id
    const userId = localStorage.getItem("userId");

    // SET POST ID in Local Storage
    const setPostId = (e) => {
        const postId = e.target.parentElement.parentElement.parentElement.parentElement.id;
        
        return localStorage.setItem("postId", postId);
    };

    // --- SHOW POST OPTIONS --- //

    const showOptions = (e) => {
        const postId = e.target.parentElement.parentElement.parentElement.parentElement.id;
        const $targetedPost = document.getElementById(postId);

        const $options = document.createElement("div");
        $options.id = "post-options";
        $options.innerHTML = `
            <button type="button" class="option-modify">Modifier</button>
            <div class="options-splitter"></div>
            <button type="button" class="option-delete">Supprimer</button>
        `;

        const $currentOptionsList = document.querySelector("#post-options");

        if ($currentOptionsList) {
            $currentOptionsList.remove();

            return $targetedPost.append($options);
        } else {

            return $targetedPost.append($options);
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

    const updatePost = (e) => {

        setIsUpdated(true);

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
                        { userId == post.User.id
                        ? <button type="button" className="post-actions-btn" onClick={ showOptions }>
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        :
                        <button type="button" className="post-actions-btn">
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        }
                    </div>
                </div>
                { isUpdated === false
                ? <div className="post-line-two post-content">{ post.content }</div>
                : <div className="post-line-two post-textarea">
                    <textarea defaultValue={ post.content } onChange={ setRequestBody }></textarea>
                    <div className="update-btn-container">
                        <button type="submit" className="update-button" onClick={ updatePost } >Modifier</button>
                    </div> 
                </div> }
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
            </div>
          )}
      </div>
    )
}
