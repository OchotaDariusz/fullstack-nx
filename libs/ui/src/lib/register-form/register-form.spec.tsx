import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RegisterForm from './register-form';

describe('RegisterForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
