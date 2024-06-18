import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export interface BurgerConstructorSlice {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
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

export const getIngredients = createAsyncThunk(
  'burgerConstructor/get',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients = [
          ...state.constructorItems.ingredients,
          action.payload
        ];
      }
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.menuIngredients = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectMenuIngredinets: (burgerConstructor) =>
      burgerConstructor.menuIngredients,
    selectLoadingState: (burgerConstructor) => burgerConstructor.isLoading,
    selectConstructorItems: (burgerConstructor) =>
      burgerConstructor.constructorItems
  }
});

export const { addIngredient } = BurgerConstructorSlice.actions;

export const {
  selectMenuIngredinets,
  selectLoadingState,
  selectConstructorItems
} = BurgerConstructorSlice.selectors;
