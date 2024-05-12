import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunckAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunckAPI.rejectWithValue(message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (thunckAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunckAPI.rejectWithValue(message);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (productId,thunckAPI) => {
      try {
        return await productService.deleteProduct(productId);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunckAPI.rejectWithValue(message);
      }
    }
  );

  // Update Product
  export const updateProduct = createAsyncThunk(
    "products/update",
    async ({formData,id}, thunckAPI) => {
      try {
        return await productService.updateProduct(formData,id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunckAPI.rejectWithValue(message);
      }
    }
  );

  // Get Product By Id
export const getProductById = createAsyncThunk(
  "products/getById",
  async (productId,thunckAPI) => {
    try {
      return await productService.getProductById(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunckAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;

      const array = [];
      products.forEach((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        array.push(productValue);
      });

      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0); // Provide 0 as the initial value

      state.totalStoreValue = totalValue;
    },

    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;

      let count = 0;
      products.forEach((item) => {
        const { quantity } = item;
        if(quantity==0){
            count += 1;
        }
      });

      state.outOfStock = count;
    },

    CALC_CATEGORY(state, action) {
      const products = action.payload;

      let array =[];
      products.map((item) => {
        const { category } = item;
        return array.push(category);
      });

      const uniqueCategory = [...new Set(array)]
      state.category = uniqueCategory 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
        toast.success("Product Added Successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Product Deleted Successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Product Updated Successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY} = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;
export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
