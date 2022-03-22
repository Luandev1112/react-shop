import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { signOut as socialLoginSignOut } from 'next-auth/client';
import { useApolloClient } from '@apollo/client';
import { useLogoutMutation } from '@framework/auth/auth.graphql';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { AUTH_TOKEN } from '@lib/constants';

export default function SignOut() {
  const { t } = useTranslation('common');
  const client = useApolloClient();
  const [, authorize] = useAtom(authorizationAtom);
  const router = useRouter();
  const [signOut] = useLogoutMutation();

  useEffect(() => {
    socialLoginSignOut({ redirect: false });
    signOut().then(() => {
      client.resetStore().then(() => {
        Cookies.remove(AUTH_TOKEN);
        authorize(false);
        router.push('/');
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <Spinner text={t('text-signing-out')} />
      </div>
    </div>
  );
}
