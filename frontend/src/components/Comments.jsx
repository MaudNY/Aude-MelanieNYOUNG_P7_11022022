import React from "react";

export default function Comments({ post }) {

    return (
        <div className="comments-list">
            <p className="comments-list-label">Commentaires</p>
            { post.Comments.map((comment) => {
                return (
                    <div id={ comment.id } key={ comment.id } className="comment-block">
                        <div className="comment-picture">
                            <img src={ comment.User.profileImageUrl } alt={ comment.User.firstName + " " + comment.User.lastName } />
                        </div>
                        <div className="comment-info">
                            <div className="comment-details">
                                <div className="comment-author-info">
                                    <div className="comment-author-name">
                                        <div className="comment-author-first-name">{ comment.User.firstName }</div>
                                        <div className="comment-author-last-name">{ comment.User.lastName }</div>
                                    </div>
                                    <div className="comment-author-job">{ comment.User.job }</div>
                                </div>
                                <div className="comment-date-options">
                                    <div className="comment-date">{ comment.createdAt }</div>
                                    { localStorage.getItem("role") === "moderator" || comment.User.id === parseFloat(localStorage.getItem("userId"))
                                    ?
                                    <button id={ comment.id } type="button" className="comment-actions-btn">
                                        <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                                    </button>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                            <div className="comment-content">{ comment.content }</div>
                        </div>
                    </div>
                )
            }) }
        </div>
      )
}
