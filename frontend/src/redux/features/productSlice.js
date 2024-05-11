import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import productService from '../../services/productService';
import { toast } from 'react-toastify';

const initialState = {
    product: null,
    products: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : '',
}

export const createProduct = createAsyncThunk(
    'products/create',
    async (formData, thunckAPI)=>{
        try {
            return await productService.createProduct(formData);  
        } catch (error) {
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(message);
            return thunckAPI.rejectWithValue(message);
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (thunckAPI)=>{
        try {
            return await productService.getAllProducts();  
        } catch (error) {
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(message);
            return thunckAPI.rejectWithValue(message);
        }
    }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action){
      console.log("Store Value");
    }
  },
  extraReducers:(builder)=>{
    builder
        .addCase(createProduct.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.products.push(action.payload);
            toast.success("Product Added Successfully");
        })
        .addCase(createProduct.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(getAllProducts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.products = action.payload; 
        })
        .addCase(getAllProducts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
  }
});



export const {CALC_STORE_VALUE} = productSlice.actions;
 
export const selectIsLoading = (state) => state.product.isLoading; 

export default productSlice.reducer;