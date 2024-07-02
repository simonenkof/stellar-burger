import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi } from '@api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../src/services/store';
import { setUser } from '../../../src/services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    loginUserApi({ email: email, password: password }).then((data) => {
      dispatch(setUser({ name: data.user.name, email: data.user.email, loggedIn: true }));
      navigation('/');
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
