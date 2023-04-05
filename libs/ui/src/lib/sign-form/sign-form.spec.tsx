import { render } from '@testing-library/react';

import SignForm from './sign-form';

describe('SignForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignForm />);
    expect(baseElement).toBeTruthy();
  });
});
