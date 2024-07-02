import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { useSelector } from '../../../src/services/store';
import { selectCurrentUser } from '../../../src/services/slices/userSlice';

import { AppHeader } from '@components';
import { ConstructorPage } from '../../pages/constructor-page';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';
import { OrderInfo } from '../../components/order-info';
import { IngredientDetails } from '../../components/ingredient-details';
import { Modal } from '../../components/modal';
import { ProtectedRoute } from '../../components/protected-route';

const App = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute redirect='/profile' isAuth={!user.loggedIn}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute redirect='/profile' isAuth={!user.loggedIn}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute redirect='/profile' isAuth={!user.loggedIn}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute redirect='/profile' isAuth={!user.loggedIn}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute redirect='/login' isAuth={user.loggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute redirect='/login' isAuth={user.loggedIn}>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Информация о добавленном ингредиенте' onClose={() => {}}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute redirect='/' isAuth={user.loggedIn}>
                <Modal title='Информация о заказе' onClose={() => {}}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
