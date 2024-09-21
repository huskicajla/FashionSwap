import React, { useEffect, useState } from "react"; 
import "./style/manage_reports_style.scss";
import axios from "axios";
import Modal from './Modal'; 

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/reports");
        setReports(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:8800/api/reports/delete_report/${reportId}`);
      setReports(reports.filter(report => report.id !== reportId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="manage_reports">
      <h2>MANAGE REPORTS:</h2>
      <div className="reports_list">
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report) => (
            <div className="report" key={report.id}>
              <div className="report_details">
                <span>{report.title}</span>
                <span>Sent on {new Date(report.report_date).toLocaleDateString()}</span>
                <button className="details-btn" onClick={() => openModal(report)}>
                SEE DETAILS
              </button>
              </div>
              <div className="report_actions">
                <button className="delete_btn" onClick={() => handleDelete(report.id)} >Delete</button>
              </div>
            </div>
          ))
        ) : (
          <h3>No reports found.</h3>
        )}
      </div>



      <Modal show={isModalOpen} onClose={closeModal} report={selectedReport} />
    </div>
  );
};

export default ManageReports;
