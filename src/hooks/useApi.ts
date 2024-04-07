import { useState } from 'react';
import { AxiosError } from 'axios';
import { ApiCaller } from '@src/api/api';

export const useApi = <T, D>(callAPi: ApiCaller<T, D>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError<T>>();

  const execute = async (req: D) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const res = await callAPi(req);
      setData(res.data);
    } catch (error) {
      setError(error as AxiosError<T>);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    execute,
  };
};
