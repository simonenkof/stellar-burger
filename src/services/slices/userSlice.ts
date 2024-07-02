import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserSlice {
  userData: UserData;
}

export type UserData = {
  loggedIn: boolean;
  name: string;
  email: string;
};

const initialState: UserSlice = {
  userData: {
    loggedIn: false,
    name: '',
    email: ''
  }
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    }
  },
  selectors: {
    selectCurrentUser: (user) => user.userData
  }
});

export const { setUser } = UserSlice.actions;

export const { selectCurrentUser } = UserSlice.selectors;
