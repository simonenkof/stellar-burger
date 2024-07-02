import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi } from '@api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../src/services/store';
import { setUser } from '../../../src/services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    registerUserApi({ name: userName, email: email, password: password }).then((data) => {
      dispatch(setUser({ name: data.user.name, email: data.user.email, loggedIn: true }));
      navigation('/');
    });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
