import { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import Button from '@components/ui/button';
import Alert from '@components/ui/alert';
import { useModalAction } from '@components/ui/modal/modal.context';

import {
  useOtpLoginMutation,
  useSendOtpCodeMutation,
} from '@framework/auth/auth.graphql';

import 'react-phone-input-2/lib/bootstrap.css';
import { AUTH_TOKEN } from '@lib/constants';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import OtpLoginForm from '@components/auth/otp-login-form';

const OtpLogin: React.FC = () => {
  const [error, setError] = useState('');
  const [otpId, setOtpId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isContactExist, setIsContactExist] = useState(false);
  const [_, authorize] = useAtom(authorizationAtom);

  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();

  const [sendOtpCode, { loading }] = useSendOtpCodeMutation({
    onCompleted: (data) => {
      if (data?.sendOtpCode?.success) {
        setIsContactExist(data?.sendOtpCode?.is_contact_exist!);
        setShowOtpInput(true);
        setOtpId(data?.sendOtpCode?.id!);
      }
      if (!data?.sendOtpCode?.success) {
        setError(data?.sendOtpCode?.message!);
      }
    },
    onError: (err) => {
      setError(err?.message);
    },
  });
  const [otpLogin, { loading: otpLoginLoading }] = useOtpLoginMutation({
    onCompleted: (data) => {
      if (data?.otpLogin?.token && data?.otpLogin?.permissions?.length) {
        Cookies.set(AUTH_TOKEN, data?.otpLogin?.token);
        authorize(true);
        closeModal();
      } else {
        setError('text-otp-verify-failed');
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  function onSendCodeSubmission() {
    sendOtpCode({
      variables: { phoneNumber },
    });
  }

  function onOtpLoginSubmission(values: any) {
    if (phoneNumber) {
      otpLogin({
        variables: {
          ...values,
          phoneNumber,
          otpId,
        },
      });
    }
  }

  return (
    <div className="mt-4">
      {error && (
        <Alert
          variant="error"
          message={t(error)}
          className="mt-4"
          closeable={true}
          onClose={() => setError('')}
        />
      )}
      {!showOtpInput ? (
        <div className="flex items-center">
          <PhoneInput
            country={'us'}
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(`+${phone}`)}
            inputClass="!p-0 !pe-4 !ps-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !border-e-0 !rounded !rounded-e-none focus:!border-accent !h-12"
            dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
          />

          <Button
            loading={loading}
            disabled={loading}
            onClick={onSendCodeSubmission}
            className="!rounded-s-none"
          >
            {t('text-send-otp')}
          </Button>
        </div>
      ) : (
        <OtpLoginForm
          onSubmit={onOtpLoginSubmission}
          loading={otpLoginLoading}
          isContactExist={isContactExist}
        />
      )}
    </div>
  );
};

export default OtpLogin;
