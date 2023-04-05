import React, { FormEventHandler, ReducerAction } from "react";

import { ACTION } from "@fullstack/constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
