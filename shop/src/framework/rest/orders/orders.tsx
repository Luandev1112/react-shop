import Collapse from 'rc-collapse';
import ErrorMessage from '@components/ui/error-message';
import OrdersWithLoader from '@components/orders/orders-with-loader';
import { useOrdersQuery } from '@framework/orders/orders.query';
import React, { Fragment, useEffect, useState } from 'react';
import OrderCard from '@components/orders/order-card';
import OrderDetails from '@components/orders/order-details';
import OrderListMobile from '@components/orders/order-list-mobile';

export default function Orders() {
  const {
    data,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useOrdersQuery({});
  const [order, setOrder] = useState<any>({});
  useEffect(() => {
    if (data?.pages?.[0].data.length) {
      setOrder(data.pages[0].data[0]);
    }
  }, [data?.pages, data?.pages.length]);
  if (error) return <ErrorMessage message={error.message} />;
  function handleLoadMore() {
    fetchNextPage();
  }
  return (
    <React.Fragment>
      <OrdersWithLoader
        notFound={!loading && !data?.pages?.[0]?.data?.length}
        isLoadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        showLoaders={loading && !data?.pages?.length}
        hasNextPage={Boolean(hasNextPage)}
        order={order}
      >
        {data?.pages?.map((page, idx) => (
          <Fragment key={idx}>
            {page?.data?.map((_order: any, index: number) => (
              <OrderCard
                key={index}
                order={_order}
                onClick={() => setOrder(_order)}
                isActive={order?.id === _order?.id}
              />
            ))}
          </Fragment>
        ))}
      </OrdersWithLoader>

      <OrderListMobile
        notFound={!loading && !data?.pages?.[0]?.data?.length}
        isLoadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        showLoaders={loading && !data?.pages?.length}
        hasNextPage={Boolean(hasNextPage)}
        order={order}
      >
        {data?.pages?.map((page, idx) => (
          <Fragment key={idx}>
            {page?.data?.map((_order: any, index: number) => (
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
          </Fragment>
        ))}
      </OrderListMobile>
    </React.Fragment>
  );
}
