import { useContactMutation } from '@framework/customer/customer.query';
import ContactForm from '@components/contact/contact-form';

export const Contact = () => {
  const { mutate, isLoading } = useContactMutation();

  function onSubmit(values: any) {
    mutate(values);
    // reset();
  }
  return <ContactForm onSubmit={onSubmit} loading={isLoading} />;
};
export default Contact;
