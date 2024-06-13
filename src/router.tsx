import { createBrowserRouter } from 'react-router-dom';
import { ConstructorPage } from './pages/constructor-page';
import { Feed } from './pages/feed';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgot-password';
import { ResetPassword } from './pages/reset-password';
import { Profile } from './pages/profile';
import { ProfileOrders } from './pages/profile-orders';
import { NotFound404 } from './pages/not-fount-404';
import { OrderInfo } from './components/order-info';
import { IngredientDetails } from './components/ingredient-details';
import { Modal } from './components/modal';
import { ProtectedRoute } from './components/protected-route';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/orders',
    element: <ProfileOrders />
  },
  {
    path: '/feed/:number',
    element: (
      <Modal title='Информация о заказе' onClose={() => {}}>
        <OrderInfo />
      </Modal>
    )
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Информация о добавленном ингредиенте' onClose={() => {}}>
        <IngredientDetails />
      </Modal>
    )
  },
  {
    path: '/profile/orders/:number',
    element: (
      <ProtectedRoute>
        <Modal title='Информация о заказе' onClose={() => {}}>
          <OrderInfo />
        </Modal>
      </ProtectedRoute>
    )
  }
]);
