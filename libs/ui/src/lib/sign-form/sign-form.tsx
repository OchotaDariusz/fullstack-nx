import { Route, Routes } from 'react-router-dom';

import LoginForm from '../login-form/login-form';
import RegisterForm from '../register-form/register-form';

/* eslint-disable-next-line */
export interface SignFormProps {}

export function SignForm(props: SignFormProps) {
  return (
    <Routes>
      {['/', '/login'].map((path, index) => {
        return <Route path={path} element={<LoginForm />} key={index} />;
      })}
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default SignForm;
