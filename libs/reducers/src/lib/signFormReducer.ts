import { ACTION } from '@fullstack/constants';
import { LoginRequest, RegisterRequest } from '@fullstack/interfaces';

export interface FormAction {
  type: ACTION;
  field: string;
  payload: string;
}
export const signFormReducer = (
  state: LoginRequest | RegisterRequest,
  action: FormAction
) => {
  switch (action.type) {
    case ACTION.GET_TEXT:
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    default:
      return state;
  }
};
