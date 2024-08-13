import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { moveUp, moveDown, removeIngredient } from '../../services/slices/consturctorBurgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(({ ingredient, index, totalItems }) => {
  const dispatch = useDispatch();

  const handleMoveDown = () => {
    dispatch(moveDown(ingredient));
  };

  const handleMoveUp = () => {
    dispatch(moveUp(ingredient));
  };

  const handleClose = () => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
});
