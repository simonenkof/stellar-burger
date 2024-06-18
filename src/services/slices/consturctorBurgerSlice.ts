import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export interface BurgerConstructorSlice {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: BurgerConstructorSlice = {
  ingredients: [],
  isLoading: false
};

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  const response = await getIngredientsApi();
  return response;
});

export const BurgerConstructorSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectIngredinets: (ingredients) => ingredients.ingredients,
    selectLoadingState: (ingredients) => ingredients.isLoading
  }
});

export const { selectIngredinets, selectLoadingState } =
  BurgerConstructorSlice.selectors;
