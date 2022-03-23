import React, { useState, useEffect } from 'react';
import authApi from "../api/auth";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export default function CreatePost() {
  // Get input values
  const inputValues = { content: "", imageUrl: "" };
  const [formValues, setFormValues] = useState(inputValues);

  // Get JSON object from input values
  const setRequestBody = (e) => {
      const {name, value} = e.target;
      setFormValues({ ...formValues, [name]: value });

      return console.log({...formValues});
  };

  // --- SET FILE PREVIEW --- //

  // Store file in state
  const [ image, setImage ] = useState();
  const [ preview, setPreview ] = useState();

  // Get post file details
  const previewFile = (e) => {
    setRequestBody(e);
    const file = e.target.files[0];
    console.log("File :", file);

    if (file) {
      setImage(file && file.type.substr(0, 5) === "image");
    } else {
      setImage(null);
    }
  };

  // Display file preview
  useEffect(() => {

    if (image) {
      const file = document.querySelector("#file").files[0];
      console.log("FILE useEffect = ", file);

      const reader = new FileReader(file);
      reader.onloadend = () => {
        setPreview(<img src={ reader.result } alt="logo" />);
        console.log("Fini !");
      }
      reader.readAsDataURL(file);
      
    } else {
      setPreview(null);
      console.log("NO IMAGE !");
    }

  }, [image]);


  // --- PUBLISH POST --- //

  const publishPost = (e) => {
    e.preventDefault();

    const postDetails = { ...formValues };
    const file = document.querySelector('input[type="file"]').files[0];

    let formData = new FormData();
    formData.append("content", postDetails.content);
    formData.append("image", file);

    authApi.post('/createpost', formData)
        .then(res => {
            console.log("Response :", res);

            return window.location.reload(false);
        })
        .catch(error => {
            
            console.log(error);
        })
  };

  return (
    <div className='create-post'>
      <div className="post-author-pic">
        <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
      </div>
      <form id="post-form" method="post" encType="multipart/form-data">
        <textarea type="text" name="content" id="content" onChange={ setRequestBody } placeholder="Que souhaitez-vous partager aujourd'hui ?" autoComplete="off" required />
        <div className="post-splitter"></div>
        <div id="preview-post-file">{ preview }</div>
        <div className="post-submit-bar">
          <input type="file" name="file" id="file" accept="image/*" onChange={ previewFile } />
          <label htmlFor="file"><AddPhotoAlternateRoundedIcon className='post-img-icon' /></label>
          <button type="submit" className="publish-button" onClick={ publishPost } >Publier</button>
        </div>

      </form>

    </div>
  )
}