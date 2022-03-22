import ConfirmationCard from '@components/ui/cards/confirmation';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useDeleteAddressMutation } from '@framework/address/address.graphql';
import { CustomerDocument } from '@framework/auth/auth.graphql';
import { getErrorMessage } from '@framework/utils/form-error';

const AddressDeleteView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const [deleteAddressById, { loading }] = useDeleteAddressMutation({
    refetchQueries: [{ query: CustomerDocument }],
  });

  function handleDelete() {
    try {
      deleteAddressById({
        variables: { id: data.addressId },
      });
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default AddressDeleteView;
