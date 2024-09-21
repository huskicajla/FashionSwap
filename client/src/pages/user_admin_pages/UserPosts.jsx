import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/authContext"; 
import { Link } from "react-router-dom";
import "./style/user_posts_style.scss";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);  
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser?.id) {
        console.log("User not found");
        return;
      }
  
      try {
        const res = await axios.get(`http://localhost:8800/api/items/user/${currentUser.id}`);
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };
  
    fetchPosts();
  }, [currentUser]);
  
  

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8800/api/items/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="user-posts">
      <h2>YOUR POSTS:</h2>
      <div className="posts-list">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-details">
                <span>{post.name}</span>
                <span>Posted on {new Date(post.date_added).toLocaleDateString()}</span>
              </div>
              <div className="post-actions">
                <Link to={`/add?edit=2`} state={post}>
                  <button className="edit-btn">EDIT</button>
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(post.id)}>DELETE</button>
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

export default UserPosts;
