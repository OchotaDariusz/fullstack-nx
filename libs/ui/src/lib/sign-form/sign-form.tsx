import { Route, Routes } from 'react-router-dom';

import LoginForm from '../login-form/login-form';
import RegisterForm from '../register-form/register-form';

export function SignForm() {
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
