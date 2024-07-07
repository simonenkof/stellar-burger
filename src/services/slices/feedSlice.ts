import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

export interface FeedSlice {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: FeedSlice = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const getOrders = createAsyncThunk('feed/get', async () => {
  const response = await getFeedsApi();
  return response;
});

export const FeedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action: PayloadAction<TFeedsResponse>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.isLoading = false;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectOrders: (feed) => feed.orders,
    selectFeed: (feed) => feed
  }
});

export const {} = FeedSlice.actions;

export const { selectOrders, selectFeed } = FeedSlice.selectors;
