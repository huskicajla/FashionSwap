import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const[inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    adress: '',
    phone_number: ''
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  return (
    <div className="login">
      <h2>Register</h2>
      <form>
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
        <button onClick={handleSubmit}>
          Register
        </button>
        {err && <p>{err.message || 'An error occurred'}</p>}
        <span>
          You have an account? 
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
