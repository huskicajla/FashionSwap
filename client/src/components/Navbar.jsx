import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.jpg";

const Navbar = () => {
    const {currentUser, logout} = useContext(AuthContext);
  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
            </div>
            <div className="links">
                <Link className='link' to="/?cat=woman">
                    <h6>WOMEN</h6>
                </Link>
                <Link className='link' to="/?cat=man">
                    <h6>MEN</h6>
                </Link>
                <Link className='link' to="/?cat=kids">
                    <h6>KIDS</h6>
                </Link>
                <Link className='link' to="/?cat=accessories">
                    <h6>ACCESSORIES</h6>
                </Link>
                <Link className='link' to="/?cat=jewelry">
                    <h6>JEWELRY</h6>
                </Link>
                <Link to={"/user"} className='link'>
                <span><b>{currentUser?.username}</b></span>
                </Link>
                {
                    currentUser ? 
                    <span onClick={logout}><b>Logout</b></span> :
                    <Link className='link' to="/login">
                        <h6><b>Login</b></h6>
                    </Link>
                }
                <span className='add'>
                    <Link className='link' to="/add">Add</Link>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Navbar
