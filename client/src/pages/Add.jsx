import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState(null);
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      setName(state.name);
      setDescription(state.description);
      setPrice(state.price);
      setQuantity(state.quantity);
      setCondition(state.condition);
      setCategory(state.category_id);
    }
  }, [state]);

  const uploadImage = async () => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data.path;  // Return only the path from the response
    } catch (err) {
      console.error("Image upload error:", err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgPath = await uploadImage();
  
    if (!currentUser || !currentUser.id) {
      window.alert("User ID not found. Please log in.");
      return;
    }
  
    const itemData = {
      name,
      description,
      price,
      quantity,
      img: imgPath,
      condition,
      user_id: currentUser.id,
      category_id: Number(category),
    };
  
    console.log("Submitting item data:", itemData);
  
    try {
      if (state && state.id) {
        console.log("Updating item with ID:", state.id);
        await axios.put(`http://localhost:8800/api/items/${state.id}`, itemData);
      } else {
        console.log("Adding new item");
        await axios.post("http://localhost:8800/api/items", itemData);
      }
      navigate("/");
    } catch (err) {
      console.error("Error submitting item:", err.response?.data || err.message);
      window.alert("Error submitting item: " + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <div className="add-item-page">
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-input textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            className="form-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition:</label>
          <input
            id="condition"
            type="text"
            className="form-input"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="form-input select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Women</option>
            <option value="2">Men</option>
            <option value="3">Kids</option>
            <option value="4">Accessories</option>
            <option value="5">Jewelry</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file">Image:</label>
          <input
            id="file"
            type="file"
            className="form-input file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="form-actions">
          <button className="btn-submit" type="submit">
            {state ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
