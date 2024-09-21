import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Modal from './Modal';  
import './style/user_reports_style.scss'; 

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      if (!currentUser?.id) {
        console.log("User not found");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8800/api/reports/get_reports/${currentUser.id}`);
        setReports(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, [currentUser]);

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const onClickBtn = () => {
    navigate("/user/send_report");
  };

  return (
    <div className="user-reports-page">
      <h2 className="report-header">REPORT CENTER:</h2>
      <div className="report-list">
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report) => (
            <div className="report-item" key={report.id}>
              <span className="report-date">{new Date(report.report_date).toLocaleDateString()}</span>
              <span className="report-title">{report.title}</span>
              <button className="details-btn" onClick={() => openModal(report)}>
                SEE DETAILS
              </button>
            </div>
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>
      <div className="make-report-btn">
        <button onClick={onClickBtn}>
          MAKE NEW REPORT
        </button>
      </div>
      

     
      <Modal show={isModalOpen} onClose={closeModal} report={selectedReport} />
    </div>
  );
};

export default UserReports;
