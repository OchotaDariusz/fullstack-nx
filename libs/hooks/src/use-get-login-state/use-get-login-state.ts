import { useEffect, useMemo, useState } from 'react';

import { User } from '../../../interfaces/src';
import { Role } from '../../../types/src';
import { JWT_LOCAL_STORAGE_KEY } from '../../../constants/src';
import { logout } from '../../../reducers/src';
import { useAppDispatch, useAppSelector } from '../../../reducers/src';

const validateAuthState = (authState: User): boolean => {
  const stateHaveIdField = 'id' in authState;
  const stateHaveUsernameField = 'username' in authState;
  const stateHaveRolesField = 'roles' in authState;
  const stateHaveNoMoreFields = Object.keys(authState).length === 3;
  const stateHaveAtLeastOneRole = (authState.roles as Role[])!.length > 0;
  const jwtToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  const jwtTokenIsString = typeof jwtToken === 'string';

  return (
    stateHaveIdField &&
    stateHaveUsernameField &&
    stateHaveRolesField &&
    stateHaveNoMoreFields &&
    stateHaveAtLeastOneRole &&
    !!jwtToken &&
    jwtTokenIsString
  );
};

export const useGetLoginState = (): boolean => {
  const authState = useAppSelector((state) => state.auth);
  const authDispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthStateValid = useMemo(
    () => validateAuthState(authState),
    [authState]
  );

  useEffect(() => {
    if (isAuthStateValid) {
      setIsLoggedIn(true);
    } else {
      authDispatch(logout());
      setIsLoggedIn(false);
    }
  }, [isAuthStateValid]);

  return isLoggedIn;
};
