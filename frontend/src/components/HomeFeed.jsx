import React from 'react';
import CreatePost from './CreatePost';
import Post from './Post';

export default function HomeFeed() {
  return (
      <main id='main-feed'>
        <div className='main-container'>
            <CreatePost />
            <Post />
        </div>
      </main>
  )
}
