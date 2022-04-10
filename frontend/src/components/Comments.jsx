import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authApi from '../api/auth';

import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Comments({ post }) {
    // Variables
    const $deletingComment = document.querySelector(".deleting-comment");

    // DELETE A COMMENT
    const [ commentDeletionAlert, setCommentDeletionAlert ] = useState(false);

    const showCommentDeletionAlert = (e) => {
        e.preventDefault();
        const $currentCommentToBeDeleted = document.querySelector(".deleting-comment");

        if ($currentCommentToBeDeleted) {
            $currentCommentToBeDeleted.classList.remove("deleting-comment")
        }

        const commentId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        const $targetedComment = document.getElementById(commentId);
        $targetedComment.classList.add("deleting-comment");
        console.log("comment à supprimer :", $targetedComment);

        return setCommentDeletionAlert(true);
    };

    const clearCommentDeletionAlert = (e) => {
        e.preventDefault();

        const $commentMeantToBeDeleted = document.querySelector(".deleting-comment");
        $commentMeantToBeDeleted.classList.remove("deleting-comment");

        return setCommentDeletionAlert(false);
    };

    const deleteComment = (e) => {
        e.preventDefault();

        const $commentId = $deletingComment.id;
        const commentIdForBackend = $commentId.split(" ")[1];

        authApi.delete(`/deletecomment/${commentIdForBackend}`)
            .then(() => {
                
                return window.location.reload(false);
            })
            .catch(error => {
            
                console.log(error);
            })

    };

    return (
        <div className="comments-list">
            <p className="comments-list-label">Commentaires</p>
            { post.Comments.map((comment) => {
                return (
                    <div id={ "commentaire " + comment.id } key={ comment.id } className="comment-block">
                        <NavLink to={ `/profil/${ comment.User.id }` } className="nav-link">
                            <div className="comment-picture">
                                <img src={ comment.User.profileImageUrl } alt={ comment.User.firstName + " " + comment.User.lastName } />
                            </div>
                        </NavLink>
                        <div className="comment-info">
                            <div className="comment-details">
                                <div className="comment-author-info">
                                    <NavLink to={ `/profil/${ comment.User.id }` } className="nav-link">
                                        <div className="comment-author-name">
                                            <div className="comment-author-first-name">{ comment.User.firstName }</div>
                                            <div className="comment-author-last-name">{ comment.User.lastName }</div>
                                        </div>
                                        <div className="comment-author-job">{ comment.User.job }</div>
                                    </NavLink>
                                </div>
                                <div className="comment-date-options">
                                    <div className="comment-date">{ comment.createdAt }</div>
                                    { localStorage.getItem("role") === "moderator" || comment.User.id === parseFloat(localStorage.getItem("userId"))
                                    ?
                                    <button type="button" className="comment-actions-btn" onClick={ showCommentDeletionAlert }>
                                        <i className="fa-solid fa-trash-can comment-actions-icon"></i>
                                    </button>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                            <div className="comment-content">{ comment.content }</div>
                        </div>
                        {commentDeletionAlert === true && $deletingComment && $deletingComment.id.includes(comment.id)
                        ?
                        <div id={ "deletion-comment-alert" + comment.id } className="deletion-comment-alert">
                            <IconButton className="cancel-deletion-comment-button" onClick={ clearCommentDeletionAlert }>
                                <CancelIcon />
                            </IconButton>
                            <div className="deletion-comment-text">Souhaitez-vous vraiment supprimer ce commentaire ?</div>
                            <div>
                                <button type="button" className="deletion-comment-button" onClick={ deleteComment }>Supprimer</button>
                            </div>
                        </div>
                        : <></>
                        }
                    </div>
                )
            }) }
        </div>
      )
}
