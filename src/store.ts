import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../src/api/productsApi';
import { productsSlice, ProductsState } from './slices/productSlice';
import {
  selectedProductsSlice,
  SelectedProductsState,
} from './slices/selectedProductsSlice';

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsSlice.reducer,
    selectedProducts: selectedProductsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = {
  selectedProducts: SelectedProductsState;
  products: ProductsState;
  [productsApi.reducerPath]?: ReturnType<typeof productsApi.reducer>;
};

export default store;
