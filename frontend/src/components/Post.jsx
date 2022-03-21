import React from 'react';
import CreateComment from './CreateComment';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Post() {
  return (
    <div className="post">
        <div className="post-line-one">
            <div className="post-picture">
                <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
            </div>
            <div className="post-details">
                <div className="author-details">
                    <div className="author-name">
                        <div className="author-first-name">Li</div>
                        <div className="author-last-name">Mai</div>
                    </div>
                    <div className="author-job">Sales Director</div>
                </div>
                <div className="post-date">01/01/1970 à 15:59</div>
                <DeleteIcon className="delete-icon" />
            </div>
        </div>
        <div className="post-line-two post-content">Blablabla</div>
        <div className="post-line-three">
            <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
        </div>
        <div className="post-line-reactions">
            <div className="comment-section">
                <ChatBubbleOutlineIcon className="comment-icon"/>
                <div className="comment-description">0 commentaires</div>
            </div>
        </div>
        <div className="post-last-line">
            <CreateComment />
        </div>
    </div>
  )
}
