import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedProductsState {
  selectedProductIds: number[];
}

const initialState: SelectedProductsState = {
  selectedProductIds: [],
};

export const selectedProductsSlice = createSlice({
  name: 'selectedProducts',
  initialState,
  reducers: {
    toggleSelectProduct: (state, action: PayloadAction<number>) => {
      const index = state.selectedProductIds.indexOf(action.payload);
      if (index >= 0) {
        state.selectedProductIds.splice(index, 1);
      } else {
        state.selectedProductIds.push(action.payload);
      }
    },
  },
});

export const { toggleSelectProduct } = selectedProductsSlice.actions;
