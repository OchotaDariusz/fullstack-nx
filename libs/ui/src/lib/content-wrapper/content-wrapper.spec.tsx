import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ContentWrapper from './content-wrapper';

describe('ContentWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ContentWrapper />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
