import React from "react";

export default function Comments({ post, postId }) {
    console.log(postId);
  return (
    <div>
        { post.Comments.map((comment) => {
            return (
                <div id={ comment.id } key={ comment.id } className="comment-line-one">
                    <div className="comment-picture">
                        <img src="" alt="à définir" />
                    </div>
                    <div className="comment-details">
                        <div className="author-details">
                            <div className="author-name">
                                <div className="author-first-name">Prénom</div>
                                <div className="author-last-name">Nom</div>
                            </div>
                            <div className="author-job">Job</div>
                        </div>
                        <div className="comment-date">Date</div>
                        { localStorage.getItem("role") === "moderator"
                        ? <button id={ post.id } type="button" className="post-actions-btn">
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        :
                        <button type="button" className="post-actions-btn">
                            <i className="fa-solid fa-ellipsis-vertical post-actions-icon"></i>
                        </button>
                        }
                    </div>
                </div>
            )
        }) }
    </div>
  )
}
