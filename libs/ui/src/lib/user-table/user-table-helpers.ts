import React, { useEffect, useState } from 'react';
import { fetchData } from '@fullstack/data-manager';
import { RegisterRequest, User } from '@fullstack/interfaces';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { logout, useAppDispatch } from '@fullstack/reducers';

const useGetUsersCount = (): [
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [usersCount, setUsersCount] = useState(0);
  useEffect(() => {
    fetchData
      .get('/api/users/?count=true')
      .then((response) => {
        setUsersCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [usersCount, setUsersCount];
};

export const useFetchUsers = (
  url: string,
  paginationModel: { page: number; pageSize: number }
) => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<User[]>([]);
  const [usersCount, setUsersCount] = useGetUsersCount();
  const authDispatch = useAppDispatch();

  // handle pagination side effects
  useEffect(() => {
    setIsLoading(true);
    fetchData
      .get(url)
      .then((response) => response.data)
      .then((users: User[]) => {
        setRows(users);
      })
      .catch((err) => {
        setError(err);
        authDispatch(logout());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel, url, authDispatch]);

  return { error, isLoading, usersCount, setUsersCount, rows, setRows };
};

const fetchUserData = async (
  config: AxiosRequestConfig,
  loadingText: string,
  successText: string
): Promise<[User | User[], boolean] | boolean> => {
  let status = false;
  const toastId = toast.loading(loadingText);
  try {
    const response = await fetchData.request<never, User | User[]>(config);
    status = true;
    toast.update(toastId, {
      render: successText,
      type: 'success',
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
      closeButton: true,
    });
    return [response, status];
  } catch (err) {
    if (err instanceof AxiosError) {
      toast.update(toastId, {
        render: err.message,
        type: 'error',
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
        closeButton: true,
      });
    }
  }
  return status;
};

export const checkIfUserExists = async (id: string): Promise<boolean> => {
  try {
    await fetchData.get(`/api/users/${id}`);
    return true;
  } catch (_err) {
    return false;
  }
};

export const addNewUser = async (username: string) => {
  const registerRequest: Partial<RegisterRequest> = {
    username,
    password: '123Password!',
  };
  return await fetchUserData(
    {
      url: '/api/users',
      method: 'POST',
      data: registerRequest,
    },
    'Adding new user...',
    'User created.'
  );
};

export const updateUser = async (
  id: string,
  updateDetails: { username?: string; password?: string }
) => {
  const updateRequest: Partial<RegisterRequest> = { ...updateDetails };
  return await fetchUserData(
    {
      url: `/api/users/${id}`,
      method: 'PATCH',
      data: updateRequest,
    },
    'Updating user...',
    'User updated.'
  );
};

export const removeUser = async (id: string) => {
  return await fetchUserData(
    {
      url: `/api/users/${id}`,
      method: 'DELETE',
    },
    'Removing user...',
    'User removed.'
  );
};
