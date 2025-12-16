import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
products:[],
selectedProduct:{},
searchTerm: "",
loading: false  
}
const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
})
export const productSlice = createSlice({
name: 'products',
initialState,
reducers: {
    setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload; 
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload; 
        },
  },
extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state,action) => {
        state.loading = true;
    });
builder
    .addCase(getAllProducts.fulfilled, (state,action) => {
        state.loading = false;
        state.products = action.payload;
    })
}
})

export const {setSelectedProduct, setSearchTerm } = productSlice.actions

export default productSlice.reducer