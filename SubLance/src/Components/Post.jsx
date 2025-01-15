import React, { useState } from 'react';
import Styles from './Post.module.css';

const Navbar = () => {
  return (
    <nav className={Styles.navbar}>
      <ul className={Styles.navList}>
        <li  className={Styles.navItem}>Post</li>
        <li className={Styles.navItem}>Create</li>
        <li className={Styles.navItem}>Assignment</li>
        <li className={Styles.navItem}>Proposal</li>
      </ul>
    </nav>
  );
};

const Post = ({ title, content }) => {
  return (
    <div className={Styles.post}>
      <h2 className={Styles.postTitle}>{title}</h2>
      <p className={Styles.postContent}>{content}</p>
    </div>
  );
};

const PostList = () => {
  const posts = [
    { title: " First Post", content: "This is the content of the first post." },
    { title: "Second Post", content: "This is the content of the second post." },
    { title: "Third Post", content: "This is the content of the third post." },
  ];
  return (
    <div className={Styles.postList}>
      {posts.map((post, index) => (
        <Post key={index} title={post.title} content={post.content} />
      ))}
    </div>
  );
};
const App = () => {
  return (<>
        <div className={Styles.app}>
            <Navbar />
            <PostList />
        </div>
        <hr style={{ border: "1px solid black" }}></hr>
  </>
    
  );
};

export default App;

  