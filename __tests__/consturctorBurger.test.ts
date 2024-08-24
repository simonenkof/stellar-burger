import {
  BurgerConstructorSlice,
  addIngredient,
  removeIngredient,
  getIngredients
} from '../src/services/slices/consturctorBurgerSlice';
import { TConstructorIngredient, TIngredient } from '../src/utils/types';

const createIngredient = (type: 'bun' | 'sauce' | 'main'): TConstructorIngredient => ({
  id: '1',
  _id: '1',
  name: 'ingredient',
  type: type,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
});

describe('BurgerConstructorSlice', () => {
  const initialState = BurgerConstructorSlice.getInitialState();

  it('должен вернуть корректное изначальное состояние', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      menuIngredients: [],
      isLoading: false
    };

    const state = BurgerConstructorSlice.reducer(undefined, { type: 'unknown' });

    expect(state).toEqual(initialState);
  });

  it('должен обрабатывать действие addIngredient для ингредиентов', () => {
    const ingredient = createIngredient('sauce');
    const state = BurgerConstructorSlice.reducer(initialState, addIngredient(ingredient));

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(expect.objectContaining({ _id: ingredient._id }));
  });

  it('должен обрабатывать действие addIngredient для булок', () => {
    const bun = createIngredient('bun');
    const state = BurgerConstructorSlice.reducer(initialState, addIngredient(bun));

    expect(state.constructorItems.bun).toEqual(expect.objectContaining({ _id: bun._id }));
  });

  it('должен обрабатывать действие removeIngredient', () => {
    const ingredient = createIngredient('main');

    let state = BurgerConstructorSlice.reducer(initialState, addIngredient(ingredient));
    state = BurgerConstructorSlice.reducer(state, removeIngredient(state.constructorItems.ingredients[0]));

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать действие getIngredients.pending', () => {
    const state = BurgerConstructorSlice.reducer(initialState, getIngredients.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  it('должен обрабатывать действие getIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Mock Ingredient 1',
        type: 'main',
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0
      },
      {
        _id: '2',
        name: 'Mock Ingredient 2',
        type: 'sauce',
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0
      }
    ];

    const state = BurgerConstructorSlice.reducer(
      initialState,
      getIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.menuIngredients).toEqual(mockIngredients);
  });

  it('должен обрабатывать действие getIngredients.rejected', () => {
    const state = BurgerConstructorSlice.reducer(initialState, getIngredients.rejected(null, '', undefined));

    expect(state.isLoading).toBe(false);
    expect(state.menuIngredients).toEqual(initialState.menuIngredients);
  });
});
