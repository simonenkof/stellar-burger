import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { deleteCookie } from '../../../src/utils/cookie';
import { useDispatch } from '../../../src/services/store';
import { setUser } from '../../../src/services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutApi().then((res) => {
      if (res.success) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser({ name: 'Личный кабинет', email: '', loggedIn: false }));
        navigate('/');
      }
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
