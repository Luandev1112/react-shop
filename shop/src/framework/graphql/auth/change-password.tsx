import { useChangePasswordMutation } from '@framework/auth/auth.graphql';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import ChangePasswordForm from '@components/auth/change-password-form';
import { FormProvider, useForm } from 'react-hook-form';
import {
  changePasswordSchema,
  FormValues,
} from '@components/auth/change-password-validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangePassword = () => {
  const { t } = useTranslation('common');
  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const [changePassword, { loading }] = useChangePasswordMutation();

  async function onSubmit({ newPassword, oldPassword }: FormValues) {
    // alert('Sorry the mutation is disable for demo!');
    const { data } = await changePassword({
      variables: {
        input: {
          newPassword,
          oldPassword,
        },
      },
    });
    if (!data?.changePassword?.success) {
      methods.setError('oldPassword', {
        type: 'manual',
        message: data?.changePassword?.message ?? '',
      });
    } else {
      toast.success(t('password-successful'));
    }
  }
  return (
    <FormProvider {...methods}>
      <ChangePasswordForm loading={loading} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ChangePassword;
