import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import "./style/edit_style.scss";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [img, setImg] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");  
      setEmail(currentUser.email || "");       
      setAddress(currentUser.address || "");    
      setPhoneNumber(currentUser.phone_number || "");  
      setImg(currentUser.img || "");            
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.id) {
        window.alert("User ID not found. Please log in.");
        return;
    }

    if (isNaN(phone_number)) {
        window.alert("Invalid phone number. Must be numeric.");
        return;
    }

    const updatedData = {
        username,
        email,
        address,
        phone_number,
        img,
        id: currentUser.id,
    };

    if (password) {
        updatedData.password = password;
    }

    try {
        console.log("Updated Data: ", updatedData);
        console.log("User ID: ", currentUser.id);

        await axios.put(`http://localhost:8800/api/users/${currentUser.id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        localStorage.setItem("user", JSON.stringify({ ...currentUser, ...updatedData }));

        window.alert("Profile updated successfully");
    } catch (err) {
        console.error("Update error: ", err);
        window.alert("Error updating profile: " + (err.response?.data?.message || err.message));
    }
};


  return (
    <div className="edit-profile">
      <div className="profile-section">
        <div className="profile-photo">
          {img ? (
            <img src={img} alt="Profile" />
          ) : (
            <div className="placeholder">Profile photo</div>
          )}
        </div>
        <input
          type="text"
          placeholder="Profile image link"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <p>{img ? "Image URL set" : "No file chosen"}</p>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
