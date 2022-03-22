import ShopsGridWithLoader from '@components/shops/grid-with-loader';
import ShopCard from '@components/ui/cards/shop';
import ErrorMessage from '@components/ui/error-message';
import { useShopsQuery } from '@framework/shops/shops.query';
import { Fragment } from 'react';

export default function Shops() {
  const {
    data,
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    error,
  } = useShopsQuery({
    is_active: 1,
  });
  if (error) return <ErrorMessage message={error.message} />;

  function handleLoadMore() {
    fetchNextPage();
  }
  return (
    <ShopsGridWithLoader
      notFound={!loading && !data?.pages?.[0]?.data?.length}
      isLoadingMore={loadingMore}
      hasNextPage={Boolean(hasNextPage)}
      onLoadMore={handleLoadMore}
      showLoaders={loading && !data?.pages?.length}
    >
      {data?.pages?.map((page, idx) => {
        return (
          <Fragment key={idx}>
            {page.data.map((shop) => (
              <ShopCard shop={shop} key={shop.id} />
            ))}
          </Fragment>
        );
      })}
    </ShopsGridWithLoader>
  );
}
