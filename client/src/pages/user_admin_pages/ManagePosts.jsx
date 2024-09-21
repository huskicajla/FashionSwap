import React, { useEffect, useState } from "react";
import "./style/manage_posts_style.scss";
import axios from "axios";


const ManagePosts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/users/items`);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);  
    }
  };

  fetchPosts();
}, []);  

const handleDelete = async (postId) => {
  try {
    await axios.delete(`http://localhost:8800/api/items/${postId}`);
    setPosts(posts.filter(post => post.id !== postId));
  } catch (err) {
    console.error("Error deleting post:", err);
  }
};

  console.log(posts);
  return (
    <div className="manage_posts">
      <h2>MANAGE POSTS:</h2>
      <div className="posts_list">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
              <div className="post_manage" key={post.id}>
                <div className="post_details">
                  <span>{post.name}</span>
                  <span>{post.username}</span>
                  <span>Posted on {new Date(post.date_added).toLocaleDateString()}</span>
                </div>
                <div className="delete_post_actions">
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete post</button>
                </div>
              </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ManagePosts;
