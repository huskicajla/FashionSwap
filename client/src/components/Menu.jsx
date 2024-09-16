import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Menu = ({cat}) => {

  const [posts, setPost] = useState([]);
  
  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await axios.get(`http://localhost:8800/api/items/?cat=${cat}`);
        setPost(res.data);
      } catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
      <h2>You may like</h2>
      {posts.map(post=>(
        <div className="post" key={post.id}>
            <img src={post.img} alt="" />
            <h2>{post.name}</h2>
            <Link className="link" to={`/item/${post.id}`}>
                <button>Read More</button>
            </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
