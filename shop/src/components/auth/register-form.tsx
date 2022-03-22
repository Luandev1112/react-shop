import { useRouter } from 'next/router';
import Logo from '@components/ui/logo';
import Alert from '@components/ui/alert';
import Input from '@components/ui/forms/input';
import PasswordInput from '@components/ui/forms/password-input';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useFormContext } from 'react-hook-form';

interface RegisterFormProps {
  errorMessage: string;
  onSubmit: (formData: any) => void;
  loading: boolean;
}
const RegisterForm: React.FC<RegisterFormProps> = ({
  errorMessage,
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const router = useRouter();
  const { closeModal, openModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  return (
    <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-[480px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
        {t('registration-helper')}
        <span
          onClick={() => handleNavigate('terms')}
          className="mx-1 underline cursor-pointer text-accent hover:no-underline"
        >
          {t('text-terms')}
        </span>
        &
        <span
          onClick={() => handleNavigate('privacy')}
          className="ms-1 underline cursor-pointer text-accent hover:no-underline"
        >
          {t('text-policy')}
        </span>
      </p>
      {errorMessage && (
        <Alert
          variant="error"
          message={t(errorMessage)}
          className="mb-6"
          closeable={true}
          // onClose={() => setErrorMsg('')}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('text-name')}
          {...register('name')}
          variant="outline"
          className="mb-5"
          error={t(errors.name?.message!)}
        />
        <Input
          label={t('text-email')}
          {...register('email')}
          type="email"
          variant="outline"
          className="mb-5"
          error={t(errors.email?.message!)}
        />
        <PasswordInput
          label={t('text-password')}
          {...register('password')}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-5"
        />
        <div className="mt-8">
          <Button className="w-full h-12" loading={loading} disabled={loading}>
            {t('text-register')}
          </Button>
        </div>
      </form>
      {/* End of forgot register form */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t('text-or')}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t('text-already-account')}{' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
        >
          {t('text-login')}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
