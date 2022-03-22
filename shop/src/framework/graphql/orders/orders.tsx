import Collapse from 'rc-collapse';
import ErrorMessage from '@components/ui/error-message';
import { NetworkStatus } from '@apollo/client';
import OrdersWithLoader from '@components/orders/orders-with-loader';
import { useOrdersQuery } from '@framework/orders/orders.graphql';
import OrderCard from '@components/orders/order-card';
import React, { useEffect, useState } from 'react';
import OrderDetails from '@components/orders/order-details';
import OrderListMobile from '@components/orders/order-list-mobile';

export default function Orders() {
  const { data, loading, error, networkStatus, fetchMore } = useOrdersQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [order, setOrder] = useState<any>({});
  useEffect(() => {
    if (data?.orders?.data?.length) {
      setOrder(data.orders.data[0]);
    }
  }, [data?.orders?.data]);
  if (error) return <ErrorMessage message={error.message} />;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.orders?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.orders?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return (
    <React.Fragment>
      <OrdersWithLoader
        notFound={!loading && !data?.orders?.data?.length}
        isLoadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        showLoaders={loading && !data?.orders?.data?.length}
        hasNextPage={Boolean(data?.orders?.paginatorInfo?.hasMorePages)}
        order={order}
      >
        {data?.orders?.data?.map((_order, index) => (
          <OrderCard
            key={index}
            order={_order}
            onClick={() => setOrder(_order)}
            isActive={order?.id === _order?.id}
          />
        ))}
      </OrdersWithLoader>

      <OrderListMobile
        notFound={!loading && !data?.orders?.data?.length}
        isLoadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        showLoaders={loading && !data?.orders?.data?.length}
        hasNextPage={Boolean(data?.orders?.paginatorInfo?.hasMorePages)}
        order={order}
      >
        {data?.orders?.data?.map((_order, index) => (
          <Collapse.Panel
            header={
              <OrderCard
                key={`mobile_${index}`}
                order={_order}
                onClick={() => setOrder(_order)}
                isActive={order?.id === _order?.id}
              />
            }
            headerClass="accordion-title"
            key={index}
            className="mb-4"
          >
            <OrderDetails order={order} />
          </Collapse.Panel>
        ))}
      </OrderListMobile>
    </React.Fragment>
  );
}
