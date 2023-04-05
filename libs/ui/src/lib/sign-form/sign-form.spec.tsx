import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignForm from './sign-form';

describe('SignForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <SignForm />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
