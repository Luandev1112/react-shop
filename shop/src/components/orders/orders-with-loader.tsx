import Button from '@components/ui/button';
import Spinner from '@components/ui/loaders/spinner/spinner';
import NotFound from '@components/ui/not-found';
import Scrollbar from '@components/ui/scrollbar';
import { useTranslation } from 'next-i18next';
import OrderDetails from './order-details';

interface OrdersWithLoaderProps {
  showLoaders: boolean;
  hasNextPage: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  notFound: boolean;
  order: any;
}

const OrdersWithLoader: React.FC<OrdersWithLoaderProps> = ({
  showLoaders,
  hasNextPage,
  isLoadingMore,
  onLoadMore,
  notFound,
  children,
  order,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="w-full hidden overflow-hidden lg:flex">
      {/* Order List */}
      <div
        className="pe-5 lg:pe-8 w-full md:w-1/3"
        style={{ height: 'calc(100vh - 60px)' }}
      >
        <div className="flex flex-col h-full pb-5 md:border md:border-border-200">
          <h3 className="text-xl font-semibold py-5 text-heading px-5">
            {t('profile-sidebar-orders')}
          </h3>
          <Scrollbar className="w-full" style={{ height: 'calc(100% - 80px)' }}>
            {showLoaders ? (
              <p>
                <Spinner showText={false} />
              </p>
            ) : (
              <div className="px-5">
                {children}
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
            )}
            {notFound && (
              <div className="w-full h-full flex items-center justify-center my-auto">
                <h4 className="text-sm font-semibold text-body text-center">
                  {t('error-no-orders')}
                </h4>
              </div>
            )}
          </Scrollbar>
        </div>
      </div>
      {/* End of Order List */}
      {Boolean(order) ? (
        <OrderDetails order={order} />
      ) : (
        <div className="max-w-lg mx-auto">
          <NotFound text="text-no-order-found" />
        </div>
      )}
    </div>
  );
};

export default OrdersWithLoader;
