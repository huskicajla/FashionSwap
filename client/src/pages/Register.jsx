import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Logo from '../img/logo.png';

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
            const response = await axios.post("http://localhost:8800/api/auth/register", inputs);
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate("/login");
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.message || 'An error occurred';
            setError(errorMessage); 
        }
    };

    return (
        <div className="login">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
            </div>
            <h2>Register</h2>
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
                    Register
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                <span>
                    You have an account? 
                    <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
