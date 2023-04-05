import { render } from '@testing-library/react';

import NavigationDrawer from './navigation-drawer';

describe('NavigationDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavigationDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
