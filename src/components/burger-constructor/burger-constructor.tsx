import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/slices/consturctorBurgerSlice';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { orderBurgerApi } from '@api';
import { setOrderData, setRequested, selectOrderData, selectRequested } from '../../../src/services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const user = useSelector(selectCurrentUser);
  const orderRequest = useSelector(selectRequested);
  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!user.isAuth) navigate('/login');

    if (!constructorItems.bun || orderRequest) return;

    const ingredients: string[] = [];
    constructorItems.ingredients.forEach((ingredient) => ingredients.push(ingredient._id));

    dispatch(setRequested(true));

    orderBurgerApi(ingredients).then((res) => {
      dispatch(setOrderData(res.order));
      dispatch(setRequested(false));
    });
  };
  const closeOrderModal = () => {
    dispatch(setOrderData(null));
  };

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
