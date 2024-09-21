import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import './user_admin_pages/style/user_page_style.scss';

const User = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="user-page">
      {currentUser?.is_admin === "1" ? (
        <>
          <h1>🎉 Welcome back, Admin! 🎉</h1>
          <p>It's nice to see you again, you're ready to make some swaptastic changes! 🚀</p>
        </>
      ) : (
        <>
          <h1>😊 Welcome back, {currentUser?.username}! 😊</h1>
          <p>It's great to see you again. Hope you have a swaptastic day! 🚀</p>
        </>
      )}
    </div>
  );
};

export default User;
