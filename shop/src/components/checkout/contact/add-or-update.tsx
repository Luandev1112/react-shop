import { useModalAction } from '@components/ui/modal/modal.context';
import { OTP } from '@framework/otp/otp';
import { customerContactAtom } from '@store/checkout';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

const AddOrUpdateCheckoutContact = () => {
  const { closeModal } = useModalAction();
  const { t } = useTranslation('common');
  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);

  function onContactUpdate(newPhoneNumber: string) {
    setContactNumber(newPhoneNumber);
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

export default AddOrUpdateCheckoutContact;
