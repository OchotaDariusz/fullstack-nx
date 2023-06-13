import { ACTION } from '@fullstack/constants';
import { User, UserAction } from '@fullstack/interfaces';

export const initialAuthState: User = {
  id: '',
  username: '',
  roles: [],
};

export const authReducer = (
  state: User = initialAuthState,
  action: UserAction
) => {
  switch (action.type) {
    case ACTION.LOGIN:
      return {
        ...state,
        id: action.payload?.id,
        username: action.payload?.username,
        roles: action.payload?.roles,
      };
    case ACTION.LOGOUT:
      return {
        ...initialAuthState,
      };
    default:
      return state;
  }
};
