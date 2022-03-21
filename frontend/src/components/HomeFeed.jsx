import React from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';

export default function HomeFeed() {
  return (
      <main id='main-feed'>
        <div className='main-container'>
            <CreatePost />
            <Posts />
        </div>
      </main>
  )
}
