import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import {
  AccountTree as AccountTreeIcon,
  Description as DescriptionIcon,
  Storage as StorageIcon,
  Spellcheck as SpellcheckIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id: productId } = useParams(); // Get productId from URL params

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setCategory(product.category || categories[0]); // Ensure default category
      setStock(product.Stock || 0);
      setOldImages(product.images || []);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
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
    <>
      <MetaData title="Update Product" />
      <Box display="flex">
        <SideBar />
        <Box flexGrow={1} p={3}>
          <Box component="form" onSubmit={updateProductSubmitHandler} encType="multipart/form-data">
            <Typography variant="h4" gutterBottom>
              Update Product
            </Typography>

            {/* Product Name */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <SpellcheckIcon />
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </Box>

            {/* Price */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AttachMoneyIcon />
              <TextField
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={loading}
              />
            </Box>

            {/* Description */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <DescriptionIcon />
              <TextField
                fullWidth
                label="Product Description"
                variant="outlined"
                multiline
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </Box>

            {/* Category */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AccountTreeIcon />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  disabled={loading}
                >
                  <MenuItem value="">Choose Category</MenuItem>
                  {categories.map((cate) => (
                    <MenuItem key={cate} value={cate}>
                      {cate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Stock */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <StorageIcon />
              <TextField
                fullWidth
                label="Stock"
                type="number"
                variant="outlined"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                disabled={loading}
              />
            </Box>

            {/* Images Upload */}
            <Box mb={2}>
              <input
                type="file"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                disabled={loading}
              />
            </Box>

            {/* Old Images Preview */}
            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
              {oldImages?.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product" width="80" height="80" />
              ))}
            </Box>

            {/* New Images Preview */}
            <Box display="flex" gap={1} flexWrap="wrap">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" width="80" height="80" />
              ))}
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProduct;
