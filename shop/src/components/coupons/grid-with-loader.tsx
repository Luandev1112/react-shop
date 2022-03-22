import Button from '@components/ui/button';
import CartCounterButton from '@components/cart/cart-counter-button';
import NotFound from '@components/ui/not-found';
import { useTranslation } from 'next-i18next';
import rangeMap from '@lib/range-map';
import CouponLoader from '@components/ui/loaders/coupon-loader';
interface GridWithLoaderProps {
  showLoaders: boolean;
  notFound: boolean;
  hasNextPage: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  limit?: number;
}
const CouponGridWithLoader: React.FC<GridWithLoaderProps> = ({
  showLoaders,
  notFound,
  children,
  hasNextPage,
  isLoadingMore,
  onLoadMore,
  limit = 20,
}) => {
  const { t } = useTranslation('common');

  if (notFound) {
    return (
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-no-coupon" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-1920 bg-gray-100 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 xl:gap-8">
          {showLoaders ? (
            <>
              {rangeMap(limit, (i) => (
                <CouponLoader key={i} uniqueKey={`coupon-${i}`} />
              ))}
            </>
          ) : (
            children
          )}
        </div>
        {hasNextPage && (
          <div className="flex items-center justify-center mt-8 lg:mt-12">
            <Button onClick={onLoadMore} loading={isLoadingMore}>
              {t('text-load-more')}
            </Button>
          </div>
        )}
      </div>
      <CartCounterButton />
    </>
  );
};

export default CouponGridWithLoader;
