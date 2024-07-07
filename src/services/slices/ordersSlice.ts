import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export interface ordersSlice {
  isLoading: boolean;
  orders: TOrder[];
}

const initialState: ordersSlice = {
  isLoading: false,
  orders: []
};

export const getOrders = createAsyncThunk('orders/get', async () => {
  const response = await getOrdersApi();
  return response;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectOrders: (feed) => feed.orders
  }
});

export const {} = ordersSlice.actions;

export const { selectOrders } = ordersSlice.selectors;
