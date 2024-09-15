import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Home = () => {

  const [posts, setPost] = useState([]);
  
  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await axios.get(`/items${cat}`);
        setPost(res.data);
      } catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/item/${post.id}`}>
                <h2>{post.name}</h2>
              </Link>
              <p>{post.description}</p>
              <Link className="link" to={`/item/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Home
