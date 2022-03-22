import { useState } from 'react';
import Cookies from 'js-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
import { useRegisterMutation } from '@framework/auth/auth.graphql';
import { getErrorMessage } from '@framework/utils/form-error';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useModalAction } from '@components/ui/modal/modal.context';
import RegisterForm from '@components/auth/register-form';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const registerFormSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  password: yup.string().required('error-password-required'),
});

const Register = () => {
  const { t } = useTranslation('common');
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [_, authorize] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();

  const methods = useForm<FormValues>({
    resolver: yupResolver(registerFormSchema),
  });
  const [registerUser, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      if (data?.register?.token && data?.register?.permissions?.length) {
        Cookies.set('auth_token', data?.register?.token);
        Cookies.set('auth_permissions', data?.register?.permissions);
        authorize(true);
        closeModal();
      } else {
        setErrorMessage(t('error-credential-wrong'));
      }
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        methods.setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    },
  });

  function onSubmit(values: FormValues) {
    client.resetStore();
    registerUser({
      variables: {
        ...values,
      },
    });
  }
  return (
    <FormProvider {...methods}>
      <RegisterForm
        onSubmit={onSubmit}
        loading={loading}
        errorMessage={errorMessage}
      />
    </FormProvider>
  );
};

export default Register;
