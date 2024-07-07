import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/slices/consturctorBurgerSlice';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!user.isAuth) navigate('/login');

    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((sum, value) => sum + value.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
