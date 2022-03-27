import React, { useState, useEffect } from "react";
import CreateComment from './CreateComment';
import authApi from '../api/auth';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function SinglePost() {
  // --- GET ONE SINGLE POST --- //
  const [ post, setPost ] = useState();

  const pathArray = window.location.pathname.split('/');
  const postId = pathArray[2];

  useEffect(() => {
      authApi.get(`/post/${postId}`)
          .then((res) => {
              console.log("Post de la page :", res.data);
              
              return setPost(res.data);
          })
          .catch(error => {
              
              console.log(error);
          })
  }, []);

  return (
    <div className="single-post">Single Post !</div>
  )
}
