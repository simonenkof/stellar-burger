import { ProtectedRouteProps } from './type';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../src/services/store';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';

export const ProtectedRoute = ({ children, onlyUnAuth }: ProtectedRouteProps) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (onlyUnAuth && user.isAuth) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user.isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
