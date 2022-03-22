import { useUpdateCustomerMutation } from '@framework/customer/customer.query';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import AddressForm from '@components/address/address-form';
import { AddressType } from '@framework/utils/constants';

type FormValues = {
  __typename?: string;
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const CreateOrUpdateAddressForm = () => {
  const {
    data: { customerId, address },
  } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: updateProfile } = useUpdateCustomerMutation();

  function onSubmit(values: FormValues) {
    const formattedInput = {
      id: address?.id,
      customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?.id && { id: address.id }),
        ...values.address,
      },
    };

    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
    closeModal();
  }
  return <AddressForm onSubmit={onSubmit} />;
};

export default CreateOrUpdateAddressForm;
