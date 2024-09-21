import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const isAdmin = currentUser?.is_admin === "1";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="FashionSwap" />
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to="/user/edit_profile">
                        <h6>EDIT PROFILE</h6>
                    </Link>
                    {isAdmin ? (
                        <>
                            <Link className='link' to="/user/manage_users">
                                <h6>MANAGE USERS</h6>
                            </Link>
                            <Link className='link' to="/user/manage_posts">
                                <h6>MANAGE POSTS</h6>
                            </Link>
                            <Link className='link' to="/user/manage_reports">
                                <h6>MANAGE REPORTS</h6>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className='link' to="/user/posts">
                                <h6>POSTS</h6>
                            </Link>
                            <Link className='link' to="/user/wishlist">
                                <h6>WISHLIST</h6>
                            </Link>
                            <Link className='link' to="/user/orders">
                                <h6>ORDERS</h6>
                            </Link>
                            <Link className='link' to="/user/reports">
                                <h6>REPORTS</h6>
                            </Link>
                        </>
                    )}
                    <Link to={"/user"} className='link'>
                        <span><b>{currentUser?.username}</b></span>
                    </Link>
                    <span onClick={handleLogout} className="link">
                        <b>Logout</b>
                    </span>
                    <span className='add'>
                        <Link className='link' to="/add">Add</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
