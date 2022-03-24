import React, { useState, useEffect } from 'react';
import authApi from '../api/auth';

import CreateComment from './CreateComment';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Posts() {
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

  return (
      <div id="homefeed">
          {data.map((post) =>
            <div className="post" key={ post.id }>
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
                    <MoreVertIcon className="more-vert-icon" />
                </div>
            </div>
            <div className="post-line-two post-content">{ post.content }</div>
            { post.imageUrl ?
                <div className="post-line-three">
                    <img src={ post.imageUrl } alt={ "image publication " + post.id + " de " + post.User.firstName + " " + post.User.lastName } />
                </div> : <></>
            }
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
        )}
    </div>
  )
}