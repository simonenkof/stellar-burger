import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { deleteCookie } from '../../../src/utils/cookie';
import { useDispatch } from '../../../src/services/store';
import { logoutUser } from '../../../src/services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutApi().then((res) => {
      if (res.success) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(logoutUser());
        navigate('/');
      }
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
