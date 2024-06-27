import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(selectCurrentUser);

  return <AppHeaderUI userName={userData.name} />;
};
