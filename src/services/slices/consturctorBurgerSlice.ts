import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import * as u from 'uuid';

export interface BurgerConstructorSlice {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  menuIngredients: TIngredient[];
  isLoading: boolean;
}

const initialState: BurgerConstructorSlice = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  menuIngredients: [],
  isLoading: false
};

export const getIngredients = createAsyncThunk('burgerConstructor/get', async () => {
  const response = await getIngredientsApi();
  return response;
});

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients = [...state.constructorItems.ingredients, action.payload];
        }
      },
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: u.v4() }
      })
    },

    moveUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.constructorItems.ingredients.findIndex((i) => i.id === action.payload.id);

      const ingredients = state.constructorItems.ingredients;
      [ingredients[index - 1], ingredients[index]] = [ingredients[index], ingredients[index - 1]];
      state.constructorItems.ingredients = [...ingredients];
    },

    moveDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.constructorItems.ingredients.findIndex((i) => i.id === action.payload.id);

      const ingredients = state.constructorItems.ingredients;
      [ingredients[index + 1], ingredients[index]] = [ingredients[index], ingredients[index + 1]];
      state.constructorItems.ingredients = [...ingredients];
    }
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
      state.menuIngredients = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectMenuIngredinets: (burgerConstructor) => burgerConstructor.menuIngredients,
    selectLoadingState: (burgerConstructor) => burgerConstructor.isLoading,
    selectConstructorItems: (burgerConstructor) => burgerConstructor.constructorItems
  }
});

export const { addIngredient, moveUp, moveDown } = BurgerConstructorSlice.actions;

export const { selectMenuIngredinets, selectLoadingState, selectConstructorItems } = BurgerConstructorSlice.selectors;
