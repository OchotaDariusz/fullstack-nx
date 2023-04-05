import { Route, Routes } from 'react-router-dom';

import LoginForm from '../login-form/login-form';
import RegisterForm from '../register-form/register-form';
import styles from './sign-form.module.scss';

/* eslint-disable-next-line */
export interface SignFormProps {}

export function SignForm(props: SignFormProps) {
  return (
    <div className={styles['container']}>
      <p>form</p>
      <Routes>
        {['/', '/login'].map((path, index) => {
          return <Route path={path} element={<LoginForm />} key={index} />;
        })}
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default SignForm;
