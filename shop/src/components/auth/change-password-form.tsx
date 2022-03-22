import Button from '@components/ui/button';
import PasswordInput from '@components/ui/forms/password-input';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';

const ChangePasswordForm = ({ onSubmit, loading }: any) => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
      noValidate
    >
      <PasswordInput
        label={t('text-old-password')}
        {...register('oldPassword')}
        error={t(errors.oldPassword?.message!)}
        className="mb-5"
        variant="outline"
      />
      <PasswordInput
        label={t('text-new-password')}
        {...register('newPassword')}
        error={t(errors.newPassword?.message!)}
        className="mb-5"
        variant="outline"
      />
      <PasswordInput
        label={t('text-confirm-password')}
        {...register('passwordConfirmation')}
        error={t(errors.passwordConfirmation?.message!)}
        className="mb-5"
        variant="outline"
      />
      <Button loading={loading} disabled={loading} className="ms-auto">
        {t('text-submit')}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
