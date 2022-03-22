import dynamic from 'next/dynamic';
import cn from 'classnames';
import Button from '@components/ui/button';
import NotFound from '@components/ui/not-found';
import { useTranslation } from 'next-i18next';
import rangeMap from '@lib/range-map';
const ProductLoader = dynamic(
  () => import('@components/ui/loaders/product-loader')
);
interface GridWithLoaderProps {
  showLoaders: boolean;
  notFound: boolean;
  hasNextPage: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  limit?: number;
  layout?: string;
}
const GridWithLoader: React.FC<GridWithLoaderProps> = ({
  showLoaders,
  limit = 20,
  children,
  notFound,
  hasNextPage,
  onLoadMore,
  isLoadingMore,
  layout,
}) => {
  const { t } = useTranslation('common');

  const renderLayoutClassName = () => {
    switch (layout) {
      case 'standard':
        return 'md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7';
      case 'shop':
        return 'lg:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6';
      default:
        return 'md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6';
    }
  };

  if (notFound) {
    return (
      <div className="bg-gray-100 w-full min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  return (
    <div
      className={cn('flex-1 bg-gray-100 pt-6 pb-8 px-4 lg:p-8 ', {
        'px-0 lg:px-0': layout === 'shop' || layout === 'modern',
      })}
    >
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 gap-3',
          renderLayoutClassName()
        )}
      >
        {showLoaders ? (
          <>
            {rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))}
          </>
        ) : (
          children
        )}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={onLoadMore}
            className="text-sm md:text-base font-semibold h-11"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GridWithLoader;
