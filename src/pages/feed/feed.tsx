import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getOrders, selectOrders } from '../../../src/services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  const updateFeed = () => {
    dispatch(getOrders());
  };

  useEffect(() => {
    updateFeed();
  }, [dispatch]);

  if (orders && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateFeed} />;
};
