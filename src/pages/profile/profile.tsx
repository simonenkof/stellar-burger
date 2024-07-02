import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../../src/services/store';
import { selectCurrentUser, setUser } from '../../../src/services/slices/userSlice';
import { updateUserApi } from '@api';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged = formValue.name !== user?.name || formValue.email !== user?.email || !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedUser = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password.length !== 0 && { password: formValue.password })
    };

    updateUserApi(updatedUser).then(() => {
      dispatch(setUser({ name: formValue.name, email: formValue.email, loggedIn: true }));
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
