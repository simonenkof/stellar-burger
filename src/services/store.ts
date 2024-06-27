import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { BurgerConstructorSlice } from './slices/consturctorBurgerSlice';
import { FeedSlice } from './slices/feedSlice';
import { UserSlice } from './slices/userSlice';

import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

const rootReducer = combineSlices(BurgerConstructorSlice, FeedSlice, UserSlice);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
