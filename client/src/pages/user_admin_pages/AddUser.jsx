import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './style/add_user_style.scss';
import Logo from '../../img/logo.png';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        adress: '',
        phone_number: ''
    });

    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/user/manage_users");
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.message || 'An error occurred';
            setError(errorMessage); 
        }
    };

    return (
        <div className="login">
            <div className="logo">
                <Link to={"/user/manage_users"}>
                <img src={Logo} alt="" />
                </Link>
            </div>
            <h2>Add new user</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    required 
                    type="text" 
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                />
                <input 
                    required 
                    type="email" 
                    placeholder="email" 
                    name="email" 
                    onChange={handleChange}
                />
                <input 
                    required 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    onChange={handleChange}
                />
                <input 
                    required 
                    type="text" 
                    placeholder="adress" 
                    name="adress" 
                    onChange={handleChange}
                />
                <input 
                    required 
                    type="text" 
                    placeholder="phone_number" 
                    name="phone_number" 
                    onChange={handleChange}
                />
                <button type="submit">
                    Add User
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
            </form>
        </div>
    );
};

export default Register;
