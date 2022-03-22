import dynamic from 'next/dynamic';
import Modal from '@components/ui/modal/modal';
import { useModalAction, useModalState } from './modal.context';
const OtpLoginView = dynamic(() => import('@components/auth/otp-login-view'));
const Login = dynamic(() => import('@framework/auth/login'));
const Register = dynamic(() => import('@framework/auth/register'));
const ForgotPassword = dynamic(() => import('@framework/auth/forget-password'));
const ProductDetailsModalView = dynamic(
  () => import('@framework/products/product'),
  { ssr: false }
);
const ShopInfoCard = dynamic(() => import('@components/shops/sidebar'));
const CreateOrUpdateAddressForm = dynamic(
  () => import('@framework/address/create-or-update')
);
const AddressDeleteView = dynamic(
  () => import('@framework/address/delete-view')
);
const AddOrUpdateCheckoutContact = dynamic(
  () => import('@components/checkout/contact/add-or-update')
);
const ProfileAddOrUpdateContact = dynamic(
  () => import('@framework/profile/profile-add-or-update-contact')
);

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <Login />}
      {view === 'REGISTER' && <Register />}
      {view === 'FORGOT_VIEW' && <ForgotPassword />}
      {view === 'OTP_LOGIN' && <OtpLoginView />}
      {view === 'ADD_OR_UPDATE_ADDRESS' && <CreateOrUpdateAddressForm />}
      {view === 'ADD_OR_UPDATE_CHECKOUT_CONTACT' && (
        <AddOrUpdateCheckoutContact />
      )}
      {view === 'ADD_OR_UPDATE_PROFILE_CONTACT' && (
        <ProfileAddOrUpdateContact />
      )}
      {view === 'DELETE_ADDRESS' && <AddressDeleteView />}
      {view === 'PRODUCT_DETAILS' && (
        <ProductDetailsModalView productSlug={data} />
      )}
      {view === 'SHOP_INFO' && (
        <ShopInfoCard
          data={data}
          cardClassName="!hidden"
          className="!flex flex-col !w-screen !h-screen max-w-screen-sm"
        />
      )}
    </Modal>
  );
};

export default ManagedModal;
