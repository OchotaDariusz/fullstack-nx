import { render } from '@testing-library/react';

import ContentWrapper from './content-wrapper';

describe('ContentWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
