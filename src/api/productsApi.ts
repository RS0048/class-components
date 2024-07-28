import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductsApiResponse } from '../interfaces/interfaces';
import Product from '../interfaces/interfaces';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    searchProducts: builder.query<ProductsApiResponse, string>({
      query: (query) => `products/search?q=${query}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});
export default productsApi;
