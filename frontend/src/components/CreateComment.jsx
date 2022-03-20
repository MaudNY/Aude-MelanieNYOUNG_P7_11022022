import React from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function CreateComment() {
  return (
    <div className="create-comment">
      <div className="comment-upper-bar">
        <div className="comment-picture">
            <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
        </div>
        <textarea type="text" name="comment-content" id="content" placeholder="Partagez votre opinion ici..." required />
        <button type="submit" className="comment-button"><SendIcon className="comment-icon" /></button>
      </div>
      <div className="comment-lower-bar">
        <div className="comment-splitter"></div>
      </div>
    </div>
  )
}
