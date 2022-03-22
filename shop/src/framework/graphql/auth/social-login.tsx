import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSocialLoginMutation } from '@framework/auth/auth.graphql';
import { AUTH_TOKEN } from '@lib/constants';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/client';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { useTranslation } from 'next-i18next';

const SocialLogin: React.FC = () => {
  const [session, loading] = useSession();
  const client = useApolloClient();
  const [_, authorize] = useAtom(authorizationAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation('common');

  const [socialLogin] = useSocialLoginMutation({
    onCompleted: (data) => {
      if (data?.socialLogin?.token && data?.socialLogin?.permissions?.length) {
        Cookies.set(AUTH_TOKEN, data?.socialLogin?.token);
        authorize(true);
      } else {
        setErrorMessage('error-credential-wrong');
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    // is true when valid social login access token and provider is available in the session
    // but not authorize/logged in yet
    if (session?.accessToken && session?.provider) {
      client.resetStore();
      socialLogin({
        variables: {
          provider: session?.provider as string,
          accessToken: session?.accessToken as string,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  return <div>{t(errorMessage)}</div>;
};

export default SocialLogin;
