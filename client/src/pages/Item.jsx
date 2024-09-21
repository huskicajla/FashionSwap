import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { AuthContext } from "../context/authContext"; 
import "../pages/user_admin_pages/style/modal.scss";

const Item = () => {
  const [post, setPost] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [totalPrice, setTotalPrice] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/items/${postId}`);
        setPost(res.data);

        if (currentUser) {
          const wishlistRes = await axios.get(
            `http://localhost:8800/api/items/${postId}/wishlist/${currentUser.id}`
          );
          setIsWishlisted(wishlistRes.data.isWishlisted);
        }
      } catch (err) {
        console.log("Error fetching post or wishlist data:", err);
      }
    };
    fetchData();
  }, [postId, currentUser]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/items/${id}`);
      navigate("/");
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };

  const handleWishlist = async (itemId) => {
    try {
      if (!currentUser) {
        alert("Please log in to add items to your wishlist.");
        return;
      }

      const response = await axios.post("http://localhost:8800/api/items/wishlist", {
        userId: currentUser.id,
        itemId,
      });

      setIsWishlisted(!isWishlisted);
      alert(response.data.message);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      if (err.response) {
        alert(`Server Error: ${err.response.data.error}`);
      } else {
        alert("Could not update wishlist.");
      }
    }
  };

  const handleBuyNow = () => {
    setIsModalOpen(true);
    setTotalPrice(post.price + 9.99);

  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePurchase = async (event) => {
    event.preventDefault();

    try {
      const orderData = {
        userId: currentUser.id,
        total_price: totalPrice,
        article_id: post.id,
      };

      const res = await axios.post("http://localhost:8800/api/orders/add_order", orderData);

      alert(res.data);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Error during purchase. Please try again.");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt={post?.name} />

        <div className="user_item">
          {post.user_img && <img src={post.user_img} alt={post.username} />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted: {moment(post.date_added).fromNow()}</p>
          </div>

          {currentUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/add?edit=2`} state={post}>
                <img src={Edit} alt="Edit" />
              </Link>
              <img onClick={() => handleDelete(post.id)} src={Delete} alt="Delete" />
            </div>
          )}

          <div className="wishlist">
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
        <div>
          <p>Delivery fee: $9.99</p>
          <button onClick={handleBuyNow}>Buy now</button>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Purchase</h2>
              <form onSubmit={handlePurchase}>
                <div className="modal-actions">
                  <button type="submit">Confirm Purchase</button>
                  <button type="button" onClick={handleModalClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Item;
