import { useState } from 'react';
import Cookies from 'js-cookie';
import { useApolloClient } from '@apollo/client';
import { useLoginMutation } from '@framework/auth/auth.graphql';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/ui/modal/modal.context';
import LoginForm from '@components/auth/login-form';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { AUTH_TOKEN } from '@lib/constants';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation('common');
  const [errorMessage, setErrorMessage] = useState('');
  const [_, authorize] = useAtom(authorizationAtom);
  const client = useApolloClient();
  const { closeModal } = useModalAction();
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data?.login?.token && data?.login?.permissions?.length) {
        Cookies.set(AUTH_TOKEN, data?.login?.token);
        authorize(true);
        closeModal();
      } else {
        setErrorMessage(t('error-credential-wrong'));
      }
    },
    onError: (error) => {
      console.log(error.message, 'error');
    },
  });

  function onSubmit({ email, password }: FormValues) {
    client.resetStore();
    login({
      variables: {
        email,
        password,
      },
    });
  }
  return (
    <LoginForm
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      loading={loading}
    />
  );
};

export default Login;
