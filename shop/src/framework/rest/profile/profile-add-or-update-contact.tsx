import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useUpdateCustomerMutation } from '@framework/customer/customer.query';
import { OTP } from '@framework/otp/otp';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

const ProfileAddOrUpdateContact = () => {
  const { t } = useTranslation('common');
  const {
    data: { customerId, contactNumber, profileId },
  } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: updateProfile } = useUpdateCustomerMutation();

  function onContactUpdate(newPhoneNumber: string) {
    if (!customerId) {
      return false;
    }
    updateProfile(
      {
        id: customerId,
        profile: {
          id: profileId,
          contact: newPhoneNumber,
        },
      },
      {
        onSuccess: () => {
          toast.success(t('profile-update-successful'));
        },
        onError: (err) => {
          toast.error(t('error-something-wrong'));
        },
      }
    );
    closeModal();
  }
  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen flex flex-col justify-center md:min-h-0">
      <h1 className="text-heading font-semibold text-sm text-center mb-5 sm:mb-6">
        {contactNumber ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>
      <OTP defaultValue={contactNumber} onVerify={onContactUpdate} />
    </div>
  );
};

export default ProfileAddOrUpdateContact;
