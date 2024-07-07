import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface FeedSlice {
  requested: boolean;
  order: TOrder | null;
}

const initialState: FeedSlice = {
  requested: false,
  order: null
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<TOrder | null>) => {
      state.order = action.payload;
    },
    setRequested: (state, action: PayloadAction<boolean>) => {
      state.requested = action.payload;
    }
  },
  selectors: {
    selectOrderData: (order) => order.order,
    selectRequested: (order) => order.requested
  }
});

export const { setOrderData, setRequested } = OrderSlice.actions;

export const { selectOrderData, selectRequested } = OrderSlice.selectors;
