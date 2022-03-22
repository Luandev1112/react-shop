import Logo from '@components/ui/logo';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import OtpLogin from '@framework/auth/otp-login';

const OtpLoginView = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  return (
    <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base leading-relaxed text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
        {t('otp-login-helper')}
      </p>

      <OtpLogin />

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-9 sm:mt-11 mb-7 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t('text-or')}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t('text-back-to')}{' '}
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

export default OtpLoginView;
