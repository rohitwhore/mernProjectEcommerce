import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button, TextField, MenuItem, Typography, Box } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); // ✅ useNavigate instead of history

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard"); // ✅ Fixed navigation issue
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]); // ✅ Removed history

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <Box className="dashboard">
        <SideBar />
        <Box className="newProductContainer">
          <form className="createProductForm" onSubmit={createProductSubmitHandler}>
            <Typography variant="h4">Create Product</Typography>

            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />

            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
            />

            <TextField
              label="Product Description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />

            <TextField
              select
              label="Category"
              variant="outlined"
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              margin="normal"
            >
              <MenuItem value="">Choose Category</MenuItem>
              {categories.map((cate) => (
                <MenuItem key={cate} value={cate}>
                  {cate}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              required
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              margin="normal"
            />

            <input type="file" accept="image/*" onChange={createProductImagesChange} multiple />

            <Box className="imagePreviewContainer">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" className="previewImage" />
              ))}
            </Box>

            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              Create
            </Button>
          </form>
        </Box>
      </Box>
    </Fragment>
  );
};

export default NewProduct;
