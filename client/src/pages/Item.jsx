import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { AuthContext } from "../context/authContext"; // Correct import

const Item = () => {

  const [post, setPost] = useState(null); // Use null for loading state
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/items/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("No user found");

        await axios.delete(`/items/${postId}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`, 
            },
            withCredentials: true, 
        });
        navigate("/");
    } catch (err) {
        console.error("Error deleting item:", err.response?.data || err.message);
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
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>

        <h2>{post.name}</h2>
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
