import React, { ReactNode, useCallback } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ACTION, THEME_MODE_LOCAL_SETTINGS } from '@fullstack/constants';
import { useAppDispatch, useAppSelector } from '@fullstack/reducers';
import { ColorMode } from '@fullstack/types';

export const ColorModeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
});

interface ThemeColorWrapperProps {
  children: ReactNode;
}

export function ThemeColorWrapper({ children }: ThemeColorWrapperProps) {
  const themeModeState = useAppSelector((state) => state.mode);
  const themeModeDispatch = useCallback(useAppDispatch(), []);
  const [mode, setMode] = React.useState<ColorMode>(
    themeModeState.mode as ColorMode
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const themeMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem(THEME_MODE_LOCAL_SETTINGS, themeMode);
          themeModeDispatch({ type: ACTION.TOGGLE_THEME });
          return themeMode;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
