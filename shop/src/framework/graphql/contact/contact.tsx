import { useContactMutation } from '@framework/contact/contact.graphql';
import { toast } from 'react-toastify';
import ContactForm from '@components/contact/contact-form';
import { useTranslation } from 'next-i18next';

export const Contact = () => {
  const { t } = useTranslation('common');
  const [mutate, { loading }] = useContactMutation();
  async function onSubmit(values: any) {
    const { data } = await mutate({
      variables: {
        input: values,
      },
    });
    if (data?.contact?.success) {
      toast.success(t(data.contact.message!));
    } else {
      toast.error(t(data?.contact?.message!));
    }
  }
  return <ContactForm onSubmit={onSubmit} loading={loading} />;
};
export default Contact;
