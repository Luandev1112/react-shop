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
} from '@framework/auth/auth.query';

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
  const { mutate: sendOtpCode, isLoading: loading } = useSendOtpCodeMutation();

  const { mutate: otpLogin, isLoading: otpLoginLoading } =
    useOtpLoginMutation();

  function onSendCodeSubmission() {
    sendOtpCode(
      {
        phone_number: phoneNumber,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setIsContactExist(data?.is_contact_exist);
            setShowOtpInput(true);
            setOtpId(data?.id);
          }
          if (!data?.success) {
            setError(data?.sendOtpCode?.message!);
          }
        },
        onError: (err: any) => {
          setError(err.message);
        },
      }
    );
  }

  function onOtpLoginSubmission(values: any) {
    if (phoneNumber) {
      otpLogin(
        {
          ...values,
          phone_number: phoneNumber,
          otp_id: otpId,
        },
        {
          onSuccess: (data) => {
            if (data?.token && data?.permissions?.length) {
              Cookies.set(AUTH_TOKEN, data.token);
              authorize(true);
              closeModal();
            }
            if (!data?.token) {
              setError('text-otp-verify-failed');
            }
          },
          onError: (err: any) => {
            setError(err.message);
          },
        }
      );
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
