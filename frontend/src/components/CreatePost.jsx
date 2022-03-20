import React from 'react';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export default function Post() {

  return (
    <div className='create-post'>
      <div className="post-upper-bar">
        <div className="post-picture">
          <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
        </div>
        <textarea type="text" name="post-content" id="content" placeholder="Que souhaitez-vous partager aujourd'hui ?" required />
      </div>
      <div className="post-splitter"></div>
      <div className="post-lower-bar">
          <AddPhotoAlternateRoundedIcon className='post-img-icon' />
          <button type="submit" className="publish-button">Publier</button>
      </div>
    </div>
  )
}