import { RouterProvider } from 'react-router-dom';
import { router } from '../../router';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <RouterProvider router={router} />
  </div>
);

export default App;
