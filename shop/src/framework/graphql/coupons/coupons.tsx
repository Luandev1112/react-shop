import { NetworkStatus } from '@apollo/client';
import CouponCard from '@components/ui/cards/coupon';
import ErrorMessage from '@components/ui/error-message';
import { useCouponsQuery } from '@framework/coupons/coupons.graphql';
import CouponGridWithLoader from '@components/coupons/grid-with-loader';
export default function Coupons() {
  const { data, loading, error, fetchMore, networkStatus } = useCouponsQuery({
    variables: {
      first: 16,
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
    <CouponGridWithLoader
      notFound={!loading && !data?.coupons?.data?.length}
      hasNextPage={data?.coupons?.paginatorInfo.hasMorePages!}
      onLoadMore={handleLoadMore}
      isLoadingMore={loadingMore}
      showLoaders={loading}
    >
      {data?.coupons?.data?.map((item) => (
        <CouponCard key={item.id} coupon={item} />
      ))}
    </CouponGridWithLoader>
  );
}
