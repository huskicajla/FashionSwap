import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext'; 
import './style/send_report_style.scss';
import { useNavigate } from 'react-router-dom';

const SendReport = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { currentUser } = useContext(AuthContext); 

  const naigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8800/api/reports/add_report', {
        user_id: currentUser.id, 
        title,
        description,
      });

      alert('Report submitted successfully!');
      setTitle('');
      setDescription('');
      naigate('/user/reports');
    } catch (err) {
      console.error('Error submitting the report:', err);
      alert('There was an error submitting the report');
    }
  };

  return (
    <div className="report-container">
      <h2 className="report-title">REPORT CENTER:</h2>

      <form className="report-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title" 
          className="report-input" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter title" 
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea 
          id="description" 
          rows="10" 
          className="report-textarea" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter report"
          required
        ></textarea>

        <button type="submit" className="report-btn">SEND REPORT</button>
      </form>
    </div>
  );
};

export default SendReport;
