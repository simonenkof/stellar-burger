import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export interface FeedSlice {
  orders: TOrder[];
}

const initialState: FeedSlice = {
  orders: []
};

export const getOrders = createAsyncThunk('feed/get', async () => {
  const response = await getOrdersApi();
  return response;
});

export const FeedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(getOrders.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(getOrders.fulfilled, (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    });
    // builder.addCase(getOrders.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
  selectors: {
    selectOrders: (feed) => feed.orders
  }
});

export const {} = FeedSlice.actions;

export const { selectOrders } = FeedSlice.selectors;
