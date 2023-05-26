import React, { FormEventHandler, ReducerAction } from 'react';

import { ACTION } from '@fullstack/constants';
import { User } from '@fullstack/interfaces';

export const handleTextChange = (
  dispatch: React.Dispatch<ReducerAction<FormEventHandler>>,
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  dispatch({
    type: ACTION.GET_TEXT,
    field: (e.target as HTMLInputElement).name,
    payload: (e.target as HTMLInputElement).value,
  });
};

export const login = (authObject: User) => {
  return { type: ACTION.LOGIN, payload: authObject };
};

export const logout = () => {
  return { type: ACTION.LOGOUT };
};
