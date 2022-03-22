import CouponCard from '@components/ui/cards/coupon';
import ErrorMessage from '@components/ui/error-message';
import { useCouponsQuery } from '@framework/coupons/coupons.query';
import CouponGridWithLoader from '@components/coupons/grid-with-loader';
import { Fragment } from 'react';
export default function Coupons() {
  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useCouponsQuery();
  if (error) return <ErrorMessage message={error.message} />;

  function handleLoadMore() {
    fetchNextPage();
  }
  return (
    <CouponGridWithLoader
      notFound={!loading && !data?.pages?.[0]?.data?.length}
      hasNextPage={Boolean(hasNextPage)}
      onLoadMore={handleLoadMore}
      isLoadingMore={loadingMore}
      showLoaders={loading && !data?.pages?.length}
    >
      {data?.pages.map((page, _idx) => (
        <Fragment key={_idx}>
          {page?.data?.map((item) => (
            <CouponCard key={item.id} coupon={item} />
          ))}
        </Fragment>
      ))}
    </CouponGridWithLoader>
  );
}
