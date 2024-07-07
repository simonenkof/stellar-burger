import { ProtectedRouteProps } from './type';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../src/services/store';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';

export const ProtectedRoute = ({ children, onlyUnAuth }: ProtectedRouteProps) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (onlyUnAuth && user.isAuth) {
    const back = location.state?.from || { pathname: '/' };

    return <Navigate to={back} replace />;
  }

  if (!onlyUnAuth && !user.isAuth) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
