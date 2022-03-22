import { useRouter } from 'next/router';
import { useOrderQuery } from '@framework/orders/orders.graphql';
import Spinner from '@components/ui/loaders/spinner/spinner';
import OrderView from '@components/orders/order-view';

export default function Order() {
  const { query } = useRouter();
  const { data, loading } = useOrderQuery({
    variables: {
      tracking_number: query.tracking_number as string,
    },
  });

  if (loading) {
    return <Spinner showText={false} />;
  }
  return <OrderView order={data?.order} />;
}
