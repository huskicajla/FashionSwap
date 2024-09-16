import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setError(err.response?.data || "An error occurred");
        }
    };

    return (
        <div className='login'>
            <h2>Login</h2>
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
                    type="password" 
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                />
                <button type="submit">
                    Login
                </button>
                {err && <p>{err.message || 'An error occurred'}</p>}
                <span>You don't have an account? 
                    <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;
