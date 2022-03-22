import { authorizationAtom } from '@store/authorization-atom';
import { useAtom } from 'jotai';
import { useCustomerQuery } from './auth.graphql';

const useUser = () => {
  const [isAuthorized] = useAtom(authorizationAtom);

  const { data, loading, error, refetch } = useCustomerQuery({
    skip: !isAuthorized,
    onError: (err) => {
      console.log(err);
    },
  });

  return { me: data?.me, loading, error, refetch };
};

export default useUser;
