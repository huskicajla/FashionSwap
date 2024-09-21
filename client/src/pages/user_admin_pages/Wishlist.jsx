import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import './style/wishlist_style.scss'; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!currentUser?.id) {
        console.log("User not found or not logged in");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8800/api/items/wishlist/${currentUser.id}`);
        setWishlist(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching user wishlist:", err.response || err.message || err);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  const handleWishlistRemove = async (post_id) => {
    try {
      await axios.post(`http://localhost:8800/api/items/wishlist`, {
        userId: currentUser.id,  
        itemId: post_id,      
      });
      setWishlist(wishlist.filter(post => post.id !== post_id));
    } catch (err) {
      console.error("Error removing post from wishlist:", err.response || err.message || err);
    }
  };

  return (
    <div className="user_posts">
      <h2>YOUR WISHLIST:</h2>
      <div className="posts-list">
        {Array.isArray(wishlist) && wishlist.length > 0 ? (
          wishlist.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-details">
                <span>{post.name}</span>
                <span>{post.username}</span> 
                <span>{post.quantity} available</span>
              </div>
              <div className="post-actions">
                <button className="delete-btn" onClick={() => handleWishlistRemove(post.id)}>REMOVE</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
