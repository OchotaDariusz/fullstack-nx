import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MainContent from './main-content';

describe('MainContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
