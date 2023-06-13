import { ACTION, THEME_MODE_LOCAL_SETTINGS } from '@fullstack/constants';
import { UserAction } from '@fullstack/interfaces';
import { ThemeMode } from '@fullstack/types';

export const loadLocalThemeMode = (): string => {
  const getDefaultThemeMode = () => {
    localStorage.setItem(
      THEME_MODE_LOCAL_SETTINGS,
      JSON.stringify({ mode: 'light' })
    );
    return 'light';
  };

  const themeMode = localStorage.getItem(THEME_MODE_LOCAL_SETTINGS);
  try {
    const { mode } = JSON.parse(themeMode as string) as ThemeMode;
    return mode;
  } catch (_err) {
    return getDefaultThemeMode();
  }
};

export const initialThemeModeState: ThemeMode = {
  mode: loadLocalThemeMode(),
};

export const themeModeReducer = (
  state = initialThemeModeState,
  action: UserAction
) => {
  switch (action.type) {
    case ACTION.TOGGLE_THEME:
      return {
        mode: state.mode === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};
