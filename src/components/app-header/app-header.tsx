import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectCurrentUser);

  return <AppHeaderUI userName={user.userData.name} />;
};
