import { useEffect } from 'react';
import userApi from '@src/api/user';
import { useApi } from '@src/hooks/useApi';
import { useStore } from '@src/stores/user-store';

export const useLogin = () => {
  const { isLoading, data, execute } = useApi(userApi.getUserById);

  useEffect(() => {
    if (data) {
      console.log('Users', data);
      useStore.setCurrentUser({
        id: data.id,
        name: data.name,
      });
    }
  }, [data]);

  const fetchUser = async (id: number) => {
    await execute({ id });
  };

  return { isLoading, data, fetchUser };
};
