import { useState } from 'react';
import Cookies from 'js-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import { useRegisterMutation } from '@framework/auth/auth.query';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useModalAction } from '@components/ui/modal/modal.context';
import RegisterForm from '@components/auth/register-form';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { AUTH_TOKEN } from '@lib/constants';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [_, authorize] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();

  const methods = useForm<FormValues>({
    resolver: yupResolver(registerFormSchema),
  });
  const { mutate, isLoading: loading } = useRegisterMutation();

  function onSubmit({ name, email, password }: FormValues) {
    mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (data?.token && data?.permissions?.length) {
            Cookies.set(AUTH_TOKEN, data.token);
            authorize(true);
            closeModal();
            return;
          }
          if (!data.token) {
            setErrorMessage(t('error-credential-wrong'));
          }
        },
        onError: (error) => {
          const {
            response: { data },
          }: any = error ?? {};
          Object.keys(data).forEach((field: any) => {
            methods.setError(field, {
              type: 'manual',
              message: data[field][0],
            });
          });
        },
      }
    );
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
