import { getLayout } from '@components/layouts/layout';
import Order from '@framework/orders/order';
export { getServerSideProps } from '@framework/ssr/order';
export default function OrderPage() {
  return <Order />;
}

OrderPage.authenticate = true;
OrderPage.getLayout = getLayout;
