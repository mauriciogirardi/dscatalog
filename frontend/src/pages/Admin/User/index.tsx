import { useCallback, useEffect, useState } from 'react';

import { User as UserProps } from 'types/user';
import { SpringPage } from 'types/vendor/spring';

import requestData from 'api/requests';

export default function User() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<SpringPage<UserProps>>();
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await requestData<SpringPage<UserProps>>({
        url: '/users',
        withCredentials: true,
        params: {
          page: page - 1,
          size: 12,
        },
      });

      if (data?.content) {
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <h1>User</h1>
    </>
  );
}
