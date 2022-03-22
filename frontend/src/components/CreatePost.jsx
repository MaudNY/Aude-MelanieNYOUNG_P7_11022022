import React, { useState } from 'react';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export default function CreatePost() {
  // Get input values
  const inputValues = { content: "", imageUrl: "", file:"" };
  const [formValues, setFormValues] = useState(inputValues);

  // Get JSON object from input values
  const setRequestBody = (e) => {
      const {name, value} = e.target;
      setFormValues({ ...formValues, [name]: value });

      const file = formValues.file;
      console.log({...formValues});
      console.log("File 2 :", file);
      console.log("e.target :", e.target);

      const $postFile = document.querySelector("#post-file");
      $postFile.innerHTML = `<img src="${e.target.files}" alt="logo" />`;
  
      return $postFile;
  };

  /*useEffect(() => {
    const $postFile = document.querySelector("#post-file");
    $postFile.innerHTML = `<img src="./assets/man-woman-looking(large).jpg" alt="logo" />`;

    return $postFile;
  }, [formValues.file]);*/

  return (
    <div className='create-post'>
      <div className="post-author-pic">
        <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
      </div>
      <form id="post-form" method="post" encType="multipart/form-data">
        <textarea type="text" name="content" id="content" onChange={ setRequestBody } placeholder="Que souhaitez-vous partager aujourd'hui ?" autoComplete="off" required />
        <div className="post-splitter"></div>
        <div id="post-file"></div>
        <div className="post-submit-bar">
          <input type="file" name="file" id="file" onChange={ setRequestBody } />
          <label htmlFor="file"><AddPhotoAlternateRoundedIcon className='post-img-icon' /></label>
          <button type="submit" className="publish-button">Publier</button>
        </div>

      </form>

    </div>
  )
}