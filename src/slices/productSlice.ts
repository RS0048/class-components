import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../interfaces/interfaces';
import { productsApi } from '../api/productsApi';

export interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      action.payload.forEach((product) => {
        if (!state.items.find((item) => item.id === product.id)) {
          state.items.push(product);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.searchProducts.matchFulfilled,
      (state, action: PayloadAction<{ products: Product[] }>) => {
        action.payload.products.forEach((product) => {
          if (!state.items.find((item) => item.id === product.id)) {
            state.items.push(product);
          }
        });
      },
    );
  },
});

export const { addProducts } = productsSlice.actions;
