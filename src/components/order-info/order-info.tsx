import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectOrders } from '../../services/slices/feedSlice';
import { selectMenuIngredients } from '../../services/slices/consturctorBurgerSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const params = useParams();
  const orders = useSelector(selectOrders);
  const allIngredients = useSelector(selectMenuIngredients);
  const orderData = useMemo(
    () => orders.find((order) => order.number === Number(params.number)),
    [orders, params.number]
  );

  const ingredients = useMemo(() => {
    if (!orderData) return [];

    return orderData.ingredients.map((ingredientId) =>
      allIngredients.find((ingredient) => ingredient._id === ingredientId)
    );
  }, [orderData, allIngredients]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce((acc: TIngredientsWithCount, item) => {
      if (!acc[item]) {
        const ingredient = ingredients.find((ing) => ing?._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: 1
          };
        }
      } else {
        acc[item].count++;
      }

      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce((acc, item) => acc + item.price * item.count, 0);

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
