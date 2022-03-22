import Button from '@components/ui/button';
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
const ShopsGridWithLoader: React.FC<GridWithLoaderProps> = ({
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
        <NotFound text="text-no-shops" />
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen ">
      <div className="w-full max-w-6xl mx-auto flex flex-col p-8 pt-14">
        <h3 className="text-2xl text-heading font-bold mb-8">
          {t('text-all-shops')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showLoaders ? (
            <>
              {rangeMap(limit, (i) => (
                <CouponLoader key={i} uniqueKey={`shops-${i}`} />
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
    </div>
  );
};

export default ShopsGridWithLoader;
