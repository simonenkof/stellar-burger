import { getUserApi, TUserResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserSlice {
  isAuth: boolean;
  userData: TUser;
}

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
    setUser: (state, action: PayloadAction<TUser>) => {
      state.userData = action.payload;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
        state.userData = action.payload.user;
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

export const { setUser, logoutUser } = UserSlice.actions;

export const { selectCurrentUser } = UserSlice.selectors;
