import React, { useEffect, useState } from "react";
import "./style/manage_users_style.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const res = await axios.get("http://localhost:8800/api/users");
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const onClickBtn = () => {
    navigate("/user/add_user");
  };

  const handleChangeActivity = async (userId) => {
    try {
      setLoading(true); 
      await axios.put(`http://localhost:8800/api/users/status/${userId}`);
      setUsers(
        users.map(user =>
          user.id === userId ? { ...user, is_active: !user.is_active } : user
        )
      );
      navigate("/user/manage_users");
    } catch (err) {
      console.error("Error updating user status:", err);
      setError("Failed to update user status. Please try again."); 
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="manage_users">
      <h2>MANAGE USERS:</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>} 

      <div className="users_list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div className="user" key={user.id}>
              <div className="user_details">
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.phone_number}</span>
                <span>{user.address}</span>
                <span>{user.is_active === "1" ? "active" : "inactive"}</span>
              </div>
              <div className="user_actions">
                <button
                  className="status_btn"
                  onClick={() => handleChangeActivity(user.id)}
                >
                  Change status
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>

      <div className="add_user_btn">
        <button onClick={onClickBtn}>ADD NEW USER</button>
      </div>
    </div>
  );
};

export default ManageUsers;
