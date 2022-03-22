import { useRouter } from 'next/router';
import { useOrderQuery } from '@framework/orders/orders.query';
import Spinner from '@components/ui/loaders/spinner/spinner';
import OrderView from '@components/orders/order-view';

export default function Order() {
  const { query } = useRouter();
  const { data, isLoading } = useOrderQuery({
    tracking_number: query.tracking_number as string,
  });

  if (isLoading) {
    return <Spinner showText={false} />;
  }
  return <OrderView order={data?.order} />;
}
