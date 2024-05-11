import axios from "axios";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Create Product
const createProduct = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/products`, formData);
  return response.data;
};

// Update Product
const updateProduct = async (formData, productId) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/products/${productId}`,
    formData
  );
  return response.data;
};

// Get All Products
const getAllProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/products`);
  return response.data;
};

// Get Product By Id
const getProductById = async (productId) => {
  const response = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
  return response.data;
};

// Delete Product
const deleteProduct = async (productId) => {
  const response = await axios.delete(
    `${BACKEND_URL}/api/products/${productId}`
  );
  return response.data;
};

const productService = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};

export default productService;
