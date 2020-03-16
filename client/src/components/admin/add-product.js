import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import socketIo from "socket.io-client";

const AddProduct = ({ add_Product, history }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    const socket = socketIo("http://localhost:5000");
    socket.on("products", data => {
      if (data.action === "create") {
        console.log(data.product);
      }
    });
  }, []);

  const [file, setFile] = useState("");

  const handleFormSubmission = e => {
    e.preventDefault();
    const postProduct = new FormData();
    postProduct.append("image", file);
    postProduct.append("title", product.title);
    postProduct.append("description", product.description);
    postProduct.append("price", product.price);
    add_Product(postProduct, history);
  };

  const handleInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileUpload = e => {
    setFile(e.target.files[0]);
  };

  const { title, description, price } = product;

  return (
    <form onSubmit={handleFormSubmission} className="form">
      <div className="form-title">
        <h3>Add A Product</h3>
        <p className="text-warning">Create a Product</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          className={title ? "form-control text-warning" : "form-control"}
          id="title"
          name="title"
          value={title}
          onChange={handleInputChange}
          required
          placeholder="Title"
        />
        <label className="form-label" id="title">
          {title && "Title"}
        </label>
      </div>

      <div className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          required
          placeholder="Upload file"
        />
      </div>

      <div className="form-group">
        <textarea
          type="text"
          className={description ? "form-control text-warning" : "form-control"}
          id="description"
          name="description"
          value={description}
          col="4"
          row="30"
          onChange={handleInputChange}
          required
          placeholder="Description"
        />
        <label className="form-label" id="description">
          {description && "Description"}
        </label>
      </div>

      <div className="form-group">
        <input
          type="text"
          className={price ? "form-control text-warning" : "form-control"}
          id="price"
          name="price"
          value={price}
          onChange={handleInputChange}
          required
          placeholder="Price"
        />
        <label className="form-label" id="price">
          {price && "Price"}
        </label>
      </div>

      <button type="submit" className="btn btn-primary form-btn">
        Add Product
      </button>
    </form>
  );
};

export default withRouter(AddProduct);
