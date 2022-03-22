import React, { useState, useEffect } from 'react';
import authApi from '../api/auth';

import CreateComment from './CreateComment';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { DateTime } from 'luxon';

export default function Posts() {
    const [ data, setData ] = useState([]);
    const now = DateTime.now().day;
    console.log("now :", now);

    const datePostNine = DateTime.fromISO("2022-03-03T15:59:48");
    console.log("Date Post 9 :", datePostNine);

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
                    <img src="./assets/man-woman-looking(large).jpg" alt="logo" />
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
            <div className="post-line-three">
                <img src={post.imageUrl} alt={"image post " + post.id} />
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
        )}
    </div>
  )
}
