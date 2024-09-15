import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    const posts = [
        {
          id: 1,
          title: 'Post 1',
          desc: 'This is the content of post 1',
          img: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          cat: "woman",
        },
        {
          id: 2,
          title: 'Post 2',
          desc: 'This is the content of post 2',
          img: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          cat: "woman",},
        {
          id: 3,
          title: 'Post 3',
          desc: 'This is the content of post 3',
          img: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          cat: "man",},
        {
          id:4,
          title: 'Post 3',
          desc: 'This is the content of post 3',
          img: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          cat: "man"},
        
      ];
  return (
    <div className='menu'>
      <h2>You may like</h2>
      {posts.map(post=>(
        <div className="post" key={post.id}>
            <img src={post.img} alt="" />
            <h2>{post.title}</h2>
            <Link className="link" to={`/item/${post.id}`}>
                <button>Read More</button>
            </Link>
        </div>
      ))}
    </div>
  )
}

export default Menu
