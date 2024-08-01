import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectMenuIngredients } from '../../services/slices/consturctorBurgerSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredients = useSelector(selectMenuIngredients);
  const currentIngredient = ingredients.filter((ingredient) => ingredient._id === params.id);
  const ingredientData = currentIngredient[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
