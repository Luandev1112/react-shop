import { NetworkStatus } from '@apollo/client';
import ShopCard from '@components/ui/cards/shop';
import { useShopsQuery } from '@framework/shops/shops.graphql';
import ErrorMessage from '@components/ui/error-message';
import ShopsGridWithLoader from '@components/shops/grid-with-loader';

export default function Shops() {
  const { data, loading, networkStatus, fetchMore, error } = useShopsQuery({
    variables: {
      is_active: true,
    },
    notifyOnNetworkStatusChange: true,
  });
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  if (error) return <ErrorMessage message={error.message} />;

  function handleLoadMore() {
    if (data?.coupons?.paginatorInfo?.currentPage) {
      fetchMore({
        variables: {
          page: data?.coupons?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return (
    <ShopsGridWithLoader
      notFound={!loading && !data?.shops?.data?.length}
      isLoadingMore={loadingMore}
      hasNextPage={data?.shops?.paginatorInfo.hasMorePages!}
      onLoadMore={handleLoadMore}
      showLoaders={loading}
    >
      {data?.shops?.data.map((shop) => (
        <ShopCard shop={shop} key={shop?.id} />
      ))}
    </ShopsGridWithLoader>
  );
}
