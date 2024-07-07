import { getUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserSlice {
  isAuth: boolean;
  userData: UserData;
}

export type UserData = {
  name: string;
  email: string;
};

const initialState: UserSlice = {
  isAuth: false,
  userData: {
    name: '',
    email: ''
  }
};

export const getUser = createAsyncThunk('user/get', async () => {
  const response = await getUserApi();
  return response;
});

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    }
  },
  // TOOD: убрать any
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuth = false;
      });
  },
  selectors: {
    selectCurrentUser: (user) => user
  }
});

export const { setUser } = UserSlice.actions;

export const { selectCurrentUser } = UserSlice.selectors;
