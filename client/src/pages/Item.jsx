import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { AuthContext } from "../context/authContext"; 

const Item = () => {
  const [post, setPost] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false); // State for wishlist
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/items/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/items/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleWishlist = async (itemId) => {
    try {
      if (!currentUser) {
        alert("Please log in to add items to your wishlist.");
        return;
      }
      await axios.post("http://localhost:8800/api/items/wishlist", {
        userId: currentUser.id,
        itemId,
      });
      setIsWishlisted(!isWishlisted); // Toggle wishlist state
      alert("Item added to wishlist!");
    } catch (err) {
      console.log(err);
      alert("Could not add to wishlist.");
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />

        <div className="user">
          {post.user_img && (
            <img src={post.user_img} alt="" />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted: {moment(post.date_added).fromNow()}</p>
          </div>

          {currentUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/add?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={() => handleDelete(post.id)} src={Delete} alt="" />
            </div>
          )}

          <div className="wishlist">
            {/* Heart icon instead of button */}
            <span
              className={`heart-icon ${isWishlisted ? "wishlisted" : ""}`}
              onClick={() => handleWishlist(post.id)}
            />
          </div>
          
        </div>

        <div className="info_post">
          <div className="left">
            <h2>{post.name}</h2>
            <span>${post.price}</span>
          </div>
          <div className="right">
            <span>Condition: {post.condition}</span>
            <span>Quantity: {post.quantity}</span>
          </div>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Item;
