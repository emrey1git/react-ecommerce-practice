import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
products:[],
selectedProduct:{},
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
    // Senkron action'lar (actions) buraya eklenecek
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

export const { } = productSlice.actions

export default productSlice.reducer