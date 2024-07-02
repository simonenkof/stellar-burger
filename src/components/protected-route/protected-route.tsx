import { ProtectedRouteProps } from './type';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, redirect, isAuth }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};
